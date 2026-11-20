import type { HttpTypes } from "@medusajs/types"
import { analyticsPath, MEASUREMENT_ID, readConsent } from "./analytics"

export const ANALYTICS_READY = "fresh:analytics-ready"
export type EcommerceName =
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
export type EcommerceData = {
  currency: string
  value: number
  items: {
    item_id: string
    item_variant?: string
    price: number
    quantity: number
  }[]
  transaction_id?: string
  tax?: number
  shipping?: number
}

type Line = {
  product_id?: string | null
  variant_id?: string | null
  quantity: number
  total?: number
  tax_total?: number
}

let consentGranted = false
export function setEcommerceConsent(granted: boolean) {
  consentGranted = granted
  if (granted) window.dispatchEvent(new Event(ANALYTICS_READY))
}

const validId = (value: unknown, prefix: string): value is string =>
  typeof value === "string" &&
  new RegExp(`^${prefix}_[A-Za-z0-9]{1,80}$`).test(value)
const amount = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
const currency = (value: string) =>
  /^[a-z]{3}$/i.test(value) ? value.toUpperCase() : null
const round = (value: number) => Math.round(value * 1e6) / 1e6

function lineItem(
  line: Line,
  addedQuantity?: number
): EcommerceData["items"][number] | null {
  if (
    !validId(line.product_id, "prod") ||
    !Number.isSafeInteger(line.quantity) ||
    line.quantity <= 0 ||
    !amount(line.total) ||
    !amount(line.tax_total) ||
    line.total < line.tax_total
  )
    return null
  return {
    item_id: line.product_id,
    ...(validId(line.variant_id, "variant")
      ? { item_variant: line.variant_id }
      : {}),
    // Medusa v2 amounts are already major units. GA value excludes tax/shipping.
    price: (line.total - line.tax_total) / line.quantity,
    quantity: addedQuantity ?? line.quantity,
  }
}

function basketData(
  code: string,
  lines: Line[],
  addedQuantity?: number
): EcommerceData | null {
  const codeValue = currency(code)
  const items = lines.map((line) => lineItem(line, addedQuantity))
  if (!codeValue || !items.length || items.some((item) => item === null))
    return null
  const validItems = items as EcommerceData["items"]
  return {
    currency: codeValue,
    items: validItems,
    value: round(
      validItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    ),
  }
}

export function productViewData(
  product: HttpTypes.StoreProduct,
  selected?: HttpTypes.StoreProductVariant
): EcommerceData | null {
  const variant =
    selected ??
    product.variants
      ?.filter((v) => amount(v.calculated_price?.calculated_amount))
      .slice()
      .sort(
        (a, b) =>
          a.calculated_price!.calculated_amount! -
          b.calculated_price!.calculated_amount!
      )[0]
  const price = variant?.calculated_price
  const code = price?.currency_code && currency(price.currency_code)
  if (
    !validId(product.id, "prod") ||
    !variant ||
    !validId(variant.id, "variant") ||
    !price ||
    !amount(price.calculated_amount) ||
    !code
  )
    return null
  return {
    currency: code,
    value: price.calculated_amount,
    items: [
      {
        item_id: product.id,
        item_variant: variant.id,
        price: price.calculated_amount,
        quantity: 1,
      },
    ],
  }
}

export function cartEcommerceData(
  cart: HttpTypes.StoreCart,
  variantId?: string,
  addedQuantity?: number
): EcommerceData | null {
  if (
    addedQuantity !== undefined &&
    (!Number.isSafeInteger(addedQuantity) || addedQuantity <= 0)
  )
    return null
  const lines = variantId
    ? cart.items?.filter((line) => line.variant_id === variantId)
    : cart.items
  if (
    addedQuantity !== undefined &&
    (lines?.length !== 1 || addedQuantity > lines[0].quantity)
  )
    return null
  return basketData(cart.currency_code, lines ?? [], addedQuantity)
}

export function purchaseData(
  order: HttpTypes.StoreOrder
): EcommerceData | null {
  if (
    !validId(order.id, "order") ||
    order.status === "canceled" ||
    order.status === "draft"
  )
    return null
  const data = basketData(order.currency_code, order.items ?? [])
  if (!data) return null
  return {
    ...data,
    transaction_id: order.id,
    ...(amount(order.tax_total) ? { tax: order.tax_total } : {}),
    ...(amount(order.shipping_total) &&
    amount(order.shipping_tax_total) &&
    order.shipping_total >= order.shipping_tax_total
      ? { shipping: round(order.shipping_total - order.shipping_tax_total) }
      : {}),
  }
}

// Rebuild the payload at the boundary, even if a caller passes extra fields.
function safeData(
  name: EcommerceName,
  data: EcommerceData
): EcommerceData | null {
  const code = currency(data.currency)
  if (
    !code ||
    !Array.isArray(data.items) ||
    !data.items.length ||
    data.items.length > 200
  )
    return null
  if (
    data.items.some(
      (item) =>
        !validId(item.item_id, "prod") ||
        !amount(item.price) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity <= 0
    )
  )
    return null
  const items = data.items.map((item) => ({
    item_id: item.item_id,
    price: item.price,
    quantity: item.quantity,
    ...(validId(item.item_variant, "variant")
      ? { item_variant: item.item_variant }
      : {}),
  }))
  const value = round(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  if (
    !amount(value) ||
    (name === "purchase" && !validId(data.transaction_id, "order"))
  )
    return null
  return {
    currency: code,
    value,
    items,
    ...(name === "purchase"
      ? {
          transaction_id: data.transaction_id,
          ...(amount(data.tax) ? { tax: data.tax } : {}),
          ...(amount(data.shipping) ? { shipping: data.shipping } : {}),
        }
      : {}),
  }
}

function canTrack() {
  return (
    consentGranted &&
    readConsent() !== "rejected" &&
    (window as Window & { "ga-disable-G-LL0GGMMC7N"?: boolean })[
      "ga-disable-G-LL0GGMMC7N"
    ] === false
  )
}

function sendEcommerce(
  name: EcommerceName,
  data: EcommerceData | null
): boolean {
  try {
    if (!canTrack() || !data) return false
    const payload = safeData(name, data)
    const tag = (window as Window & { gtag?: (...args: unknown[]) => void })
      .gtag
    if (!payload || !tag) return false
    tag("event", name, {
      ...payload,
      send_to: MEASUREMENT_ID,
      page_location: `${window.location.origin}${analyticsPath(
        window.location.pathname
      )}`,
      page_referrer: "",
      page_title: "Storefront",
    })
    return true
  } catch {
    // Tracking must never break a cart mutation, checkout or order page.
    return false
  }
}

export function trackEcommerce(
  name: Exclude<EcommerceName, "purchase">,
  data: EcommerceData | null
): boolean {
  return sendEcommerce(name, data)
}

export async function trackPurchase(
  data: EcommerceData | null
): Promise<boolean> {
  try {
    if (
      !data ||
      !canTrack() ||
      !validId(data.transaction_id, "order") ||
      !navigator.locks
    )
      return false
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(data.transaction_id)
        )
      )
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
    const key = `fresh-ga4-purchase-v1:${hash}`
    return await navigator.locks.request(key, () => {
      if (!canTrack() || localStorage.getItem(key)) return false
      // Mark before queuing, under a cross-tab lock. Fail closed if storage is
      // blocked; neither analytics failure nor storage failure affects shopping.
      localStorage.setItem(key, "queued")
      if (sendEcommerce("purchase", data)) return true
      localStorage.removeItem(key)
      return false
    })
  } catch {
    return false
  }
}
