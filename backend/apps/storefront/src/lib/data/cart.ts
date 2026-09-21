"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeCartId,
  setCartId,
} from "./cookies"

import { getRegion } from "./regions"
import { getLocale } from "@lib/data/locale-actions"

/**
 * ============================================================
 * RETRIEVE CART
 * ============================================================
 *
 * Retrieves a cart by its ID.
 *
 * For normal cart display we request the complete cart data.
 * For getOrSetCart() we request only:
 *
 *   id,region_id
 *
 * This keeps the "Add to Cart" path lightweight.
 */
export async function retrieveCart(
  cartId?: string,
  fields?: string
) {
  const id = cartId || (await getCartId())

  fields ??=
    "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name"

  if (!id) {
    return null
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("carts")),
  }

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(
      `/store/carts/${id}`,
      {
        method: "GET",
        query: {
          fields,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(
      ({
        cart,
      }: {
        cart: HttpTypes.StoreCart
      }) => cart
    )
    .catch(() => null)
}

/**
 * ============================================================
 * GET OR CREATE CART
 * ============================================================
 *
 * Performance optimized:
 *
 * 1. Get region first.
 * 2. Read cart ID from cookie.
 * 3. If cart exists, retrieve ONLY id + region_id.
 * 4. If region matches, immediately return.
 * 5. Only update region if necessary.
 * 6. Create cart only when there is no valid cart.
 *
 * This prevents the Add to Cart request from loading
 * the complete cart before creating the line item.
 */
export async function getOrSetCart(
  countryCode: string
) {
  const start = Date.now()

  /**
   * ----------------------------------------------------------
   * Get region
   * ----------------------------------------------------------
   */
  const regionStart = Date.now()

  const region = await getRegion(countryCode)

  console.log(
    `[CART] getRegion: ${Date.now() - regionStart}ms`
  )

  if (!region) {
    throw new Error(
      `Region not found for country code: ${countryCode}`
    )
  }

  /**
   * ----------------------------------------------------------
   * Get existing cart ID
   * ----------------------------------------------------------
   */
  const cartId = await getCartId()

  /**
   * ----------------------------------------------------------
   * Existing cart
   * ----------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We only retrieve id + region_id here.
   *
   * The old implementation requested the entire cart,
   * which can be expensive on a slow backend/database.
   */
  if (cartId) {
    const cartStart = Date.now()

    const cart = await retrieveCart(
      cartId,
      "id,region_id"
    )

    console.log(
      `[CART] retrieve existing cart: ${
        Date.now() - cartStart
      }ms`
    )

    /**
     * --------------------------------------------------------
     * Cart exists
     * --------------------------------------------------------
     */
    if (cart) {
      /**
       * ------------------------------------------------------
       * Region already correct
       * ------------------------------------------------------
       *
       * This is the fastest path.
       */
      if (cart.region_id === region.id) {
        console.log(
          `[CART] getOrSetCart total: ${
            Date.now() - start
          }ms`
        )

        return cart
      }

      /**
       * ------------------------------------------------------
       * Region changed
       * ------------------------------------------------------
       */
      const headers = {
        ...(await getAuthHeaders()),
      }

      const updateStart = Date.now()

      const updatedCart = await sdk.store.cart
        .update(
          cart.id,
          {
            region_id: region.id,
          },
          {},
          headers
        )
        .then(
          ({
            cart,
          }: {
            cart: HttpTypes.StoreCart
          }) => cart
        )

      console.log(
        `[CART] update region: ${
          Date.now() - updateStart
        }ms`
      )

      /**
       * Only invalidate cart cache.
       */
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)

      console.log(
        `[CART] getOrSetCart total: ${
          Date.now() - start
        }ms`
      )

      return updatedCart
    }
  }

  /**
   * ----------------------------------------------------------
   * No cart exists
   * ----------------------------------------------------------
   *
   * Create a new cart.
   */
  const headers = {
    ...(await getAuthHeaders()),
  }

  const locale = await getLocale()

  const createStart = Date.now()

  const cartResp = await sdk.store.cart.create(
    {
      region_id: region.id,
      locale: locale || undefined,
    },
    {},
    headers
  )

  console.log(
    `[CART] create cart: ${
      Date.now() - createStart
    }ms`
  )

  const cart = cartResp.cart

  /**
   * Save cart ID to cookie.
   */
  await setCartId(cart.id)

  /**
   * Revalidate cart cache.
   */
  const cartCacheTag =
    await getCacheTag("carts")

  revalidateTag(cartCacheTag)

  console.log(
    `[CART] getOrSetCart total: ${
      Date.now() - start
    }ms`
  )

  return cart
}

/**
 * ============================================================
 * UPDATE CART
 * ============================================================
 */
export async function updateCart(
  data: HttpTypes.StoreUpdateCart
) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error(
      "No existing cart found, please create one before updating"
    )
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .update(
      cartId,
      data,
      {},
      headers
    )
    .then(
      async ({
        cart,
      }: {
        cart: HttpTypes.StoreCart
      }) => {
        const cartCacheTag =
          await getCacheTag("carts")

        revalidateTag(cartCacheTag)

        /**
         * Fulfillment can change when the cart itself
         * changes, so keep this invalidation here.
         */
        const fulfillmentCacheTag =
          await getCacheTag("fulfillment")

        revalidateTag(fulfillmentCacheTag)

        return cart
      }
    )
    .catch(medusaError)
}

/**
 * ============================================================
 * ADD TO CART
 * ============================================================
 *
 * PERFORMANCE OPTIMIZED
 *
 * Main improvements:
 *
 * - Reuses existing cart.
 * - Does not retrieve full cart before adding.
 * - Only checks id + region_id.
 * - Does NOT invalidate fulfillment cache.
 * - Adds detailed timing logs.
 */
export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  const totalStart = Date.now()

  try {
    /**
     * --------------------------------------------------------
     * Validate variant
     * --------------------------------------------------------
     */
    if (!variantId) {
      throw new Error(
        "Missing variant ID when adding to cart"
      )
    }

    /**
     * --------------------------------------------------------
     * Validate quantity
     * --------------------------------------------------------
     */
    if (!quantity || quantity < 1) {
      throw new Error(
        "Quantity must be greater than zero"
      )
    }

    console.log(
      "========================================"
    )

    console.log("🛒 ADD TO CART START")

    console.log(
      "Variant ID:",
      variantId
    )

    console.log(
      "Quantity:",
      quantity
    )

    console.log(
      "Country Code:",
      countryCode
    )

    /**
     * --------------------------------------------------------
     * Step 1: Get or create cart
     * --------------------------------------------------------
     */
    const cartStart = Date.now()

    const cart =
      await getOrSetCart(countryCode)

    console.log(
      `[CART] getOrSetCart: ${
        Date.now() - cartStart
      }ms`
    )

    if (!cart) {
      throw new Error(
        "Error retrieving or creating cart"
      )
    }

    console.log(
      "Cart ID:",
      cart.id
    )

    console.log(
      "Cart Region:",
      cart.region_id
    )

    /**
     * --------------------------------------------------------
     * Step 2: Authentication headers
     * --------------------------------------------------------
     */
    const headers = {
      ...(await getAuthHeaders()),
    }

    /**
     * --------------------------------------------------------
     * Step 3: Create line item
     * --------------------------------------------------------
     */
    console.log(
      "Creating line item..."
    )

    const lineItemStart = Date.now()

    const result =
      await sdk.store.cart.createLineItem(
        cart.id,
        {
          variant_id: variantId,
          quantity,
        },
        {},
        headers
      )

    console.log(
      `[CART] createLineItem: ${
        Date.now() - lineItemStart
      }ms`
    )

    console.log(
      "✅ ADD TO CART SUCCESS"
    )

    console.log(
      "Updated Cart ID:",
      result.cart?.id
    )

    /**
     * --------------------------------------------------------
     * IMPORTANT PERFORMANCE CHANGE
     * --------------------------------------------------------
     *
     * We intentionally do NOT revalidate fulfillment here.
     *
     * Adding a product does not itself require the
     * fulfillment/shipping options cache to be rebuilt.
     */
    const cartCacheTag =
      await getCacheTag("carts")

    revalidateTag(cartCacheTag)

    console.log(
      `[CART] TOTAL ADD TO CART: ${
        Date.now() - totalStart
      }ms`
    )

    console.log(
      "🛒 ADD TO CART FINISHED"
    )

    console.log(
      "========================================"
    )

    return result.cart
  } catch (error: any) {
    console.error(
      "========================================"
    )

    console.error(
      "❌ ADD TO CART ERROR"
    )

    console.error(
      "Message:",
      error?.message
    )

    console.error(
      "Status:",
      error?.status
    )

    console.error(
      "Response:",
      error?.response
    )

    console.error(
      "Full Error:",
      error
    )

    console.error(
      `[CART] TOTAL FAILED TIME: ${
        Date.now() - totalStart
      }ms`
    )

    console.error(
      "========================================"
    )

    throw error
  }
}

/**
 * ============================================================
 * UPDATE LINE ITEM
 * ============================================================
 */
export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) {
    throw new Error(
      "Missing lineItem ID when updating line item"
    )
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error(
      "Missing cart ID when updating line item"
    )
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .updateLineItem(
      cartId,
      lineId,
      {
        quantity,
      },
      {},
      headers
    )
    .then(async () => {
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)

      const fulfillmentCacheTag =
        await getCacheTag("fulfillment")

      revalidateTag(
        fulfillmentCacheTag
      )
    })
    .catch(medusaError)
}

/**
 * ============================================================
 * DELETE LINE ITEM
 * ============================================================
 */
export async function deleteLineItem(
  lineId: string
) {
  if (!lineId) {
    throw new Error(
      "Missing lineItem ID when deleting line item"
    )
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error(
      "Missing cart ID when deleting line item"
    )
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .deleteLineItem(
      cartId,
      lineId,
      {},
      headers
    )
    .then(async () => {
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)

      const fulfillmentCacheTag =
        await getCacheTag("fulfillment")

      revalidateTag(
        fulfillmentCacheTag
      )
    })
    .catch(medusaError)
}

/**
 * ============================================================
 * SET SHIPPING METHOD
 * ============================================================
 */
export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .addShippingMethod(
      cartId,
      {
        option_id: shippingMethodId,
      },
      {},
      headers
    )
    .then(async () => {
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

/**
 * ============================================================
 * INITIATE PAYMENT SESSION
 * ============================================================
 */
export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession
) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.payment
    .initiatePaymentSession(
      cart,
      data,
      {},
      headers
    )
    .then(async (resp) => {
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)

      return resp
    })
    .catch(medusaError)
}

/**
 * ============================================================
 * APPLY PROMOTIONS
 * ============================================================
 */
export async function applyPromotions(
  codes: string[]
) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error(
      "No existing cart found"
    )
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .update(
      cartId,
      {
        promo_codes: codes,
      },
      {},
      headers
    )
    .then(async () => {
      const cartCacheTag =
        await getCacheTag("carts")

      revalidateTag(cartCacheTag)

      const fulfillmentCacheTag =
        await getCacheTag(
          "fulfillment"
        )

      revalidateTag(
        fulfillmentCacheTag
      )
    })
    .catch(medusaError)
}

/**
 * ============================================================
 * APPLY GIFT CARD
 * ============================================================
 *
 * Reserved for future implementation.
 */
export async function applyGiftCard(
  code: string
) {
  // Intentionally left as reserved functionality.
  // The existing implementation was commented out.
}

/**
 * ============================================================
 * REMOVE DISCOUNT
 * ============================================================
 *
 * Reserved for future implementation.
 */
export async function removeDiscount(
  code: string
) {
  // Intentionally left as reserved functionality.
}

/**
 * ============================================================
 * REMOVE GIFT CARD
 * ============================================================
 *
 * Reserved for future implementation.
 */
export async function removeGiftCard(
  codeToRemove: string,
  giftCards: any[]
) {
  // Intentionally left as reserved functionality.
}

/**
 * ============================================================
 * SUBMIT PROMOTION FORM
 * ============================================================
 */
export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData
) {
  const code =
    formData.get("code") as string

  try {
    await applyPromotions([code])
  } catch (e: any) {
    return e.message
  }
}

/**
 * ============================================================
 * SET ADDRESSES
 * ============================================================
 *
 * TODO:
 * Pass a POJO instead of a form entity here.
 */
export async function setAddresses(
  currentState: unknown,
  formData: FormData
) {
  try {
    if (!formData) {
      throw new Error(
        "No form data found when setting addresses"
      )
    }

    const cartId =
      await getCartId()

    if (!cartId) {
      throw new Error(
        "No existing cart found when setting addresses"
      )
    }

    const data = {
      shipping_address: {
        first_name:
          formData.get(
            "shipping_address.first_name"
          ),

        last_name:
          formData.get(
            "shipping_address.last_name"
          ),

        address_1:
          formData.get(
            "shipping_address.address_1"
          ),

        address_2: "",

        company:
          formData.get(
            "shipping_address.company"
          ),

        postal_code:
          formData.get(
            "shipping_address.postal_code"
          ),

        city:
          formData.get(
            "shipping_address.city"
          ),

        country_code:
          formData.get(
            "shipping_address.country_code"
          ),

        province:
          formData.get(
            "shipping_address.province"
          ),

        phone:
          formData.get(
            "shipping_address.phone"
          ),
      },

      email:
        formData.get("email"),
    } as any

    /**
     * --------------------------------------------------------
     * Same billing address
     * --------------------------------------------------------
     */
    const sameAsBilling =
      formData.get(
        "same_as_billing"
      )

    if (sameAsBilling === "on") {
      data.billing_address =
        data.shipping_address
    }

    /**
     * --------------------------------------------------------
     * Different billing address
     * --------------------------------------------------------
     */
    if (sameAsBilling !== "on") {
      data.billing_address = {
        first_name:
          formData.get(
            "billing_address.first_name"
          ),

        last_name:
          formData.get(
            "billing_address.last_name"
          ),

        address_1:
          formData.get(
            "billing_address.address_1"
          ),

        address_2: "",

        company:
          formData.get(
            "billing_address.company"
          ),

        postal_code:
          formData.get(
            "billing_address.postal_code"
          ),

        city:
          formData.get(
            "billing_address.city"
          ),

        country_code:
          formData.get(
            "billing_address.country_code"
          ),

        province:
          formData.get(
            "billing_address.province"
          ),

        phone:
          formData.get(
            "billing_address.phone"
          ),
      }
    }

    await updateCart(data)
  } catch (e: any) {
    return e.message
  }

  redirect(
    `/${formData.get(
      "shipping_address.country_code"
    )}/checkout?step=delivery`
  )
}

/**
 * ============================================================
 * PLACE ORDER
 * ============================================================
 */
export async function placeOrder(
  cartId?: string
) {
  const id =
    cartId ||
    (await getCartId())

  if (!id) {
    throw new Error(
      "No existing cart found when placing order"
    )
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const cartRes =
    await sdk.store.cart
      .complete(
        id,
        {},
        headers
      )
      .then(async (cartRes) => {
        const cartCacheTag =
          await getCacheTag(
            "carts"
          )

        revalidateTag(
          cartCacheTag
        )

        return cartRes
      })
      .catch(medusaError)

  /**
   * ----------------------------------------------------------
   * Order successfully created
   * ----------------------------------------------------------
   */
  if (
    cartRes?.type === "order"
  ) {
    const countryCode =
      cartRes.order
        .shipping_address
        ?.country_code
        ?.toLowerCase()

    const orderCacheTag =
      await getCacheTag(
        "orders"
      )

    revalidateTag(
      orderCacheTag
    )

    /**
     * Remove cart cookie after successful order.
     */
    removeCartId()

    redirect(
      `/${countryCode}/order/${cartRes?.order.id}/confirmed`
    )
  }

  return cartRes.cart
}

/**
 * ============================================================
 * UPDATE REGION
 * ============================================================
 *
 * Updates the country code parameter and
 * revalidates region/product caches.
 */
export async function updateRegion(
  countryCode: string,
  currentPath: string
) {
  const cartId =
    await getCartId()

  const region =
    await getRegion(
      countryCode
    )

  if (!region) {
    throw new Error(
      `Region not found for country code: ${countryCode}`
    )
  }

  /**
   * Update cart region if cart exists.
   */
  if (cartId) {
    await updateCart({
      region_id: region.id,
    })

    const cartCacheTag =
      await getCacheTag(
        "carts"
      )

    revalidateTag(
      cartCacheTag
    )
  }

  /**
   * Revalidate region cache.
   */
  const regionCacheTag =
    await getCacheTag(
      "regions"
    )

  revalidateTag(
    regionCacheTag
  )

  /**
   * Revalidate products.
   */
  const productsCacheTag =
    await getCacheTag(
      "products"
    )

  revalidateTag(
    productsCacheTag
  )

  redirect(
    `/${countryCode}${currentPath}`
  )
}

/**
 * ============================================================
 * LIST CART SHIPPING OPTIONS
 * ============================================================
 */
export async function listCartOptions() {
  const cartId =
    await getCartId()

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(
      "shippingOptions"
    )),
  }

  return await sdk.client.fetch<{
    shipping_options:
      HttpTypes.StoreCartShippingOption[]
  }>(
    "/store/shipping-options",
    {
      query: {
        cart_id: cartId,
      },

      next,

      headers,

      cache: "force-cache",
    }
  )
}