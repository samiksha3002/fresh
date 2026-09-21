"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: any
    ) => {
      acc[varopt.option_id] = varopt.value
      return acc
    },
    {}
  )
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const [options, setOptions] = useState<
    Record<string, string | undefined>
  >({})

  const [isAdding, setIsAdding] =
    useState(false)

  const countryCode =
    params.countryCode as string

  /**
   * ==========================================================
   * PRESELECT VARIANT
   * ==========================================================
   *
   * If the product has only one variant,
   * automatically select its options.
   */
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions =
        optionsAsKeymap(
          product.variants[0].options
        )

      setOptions(
        variantOptions ?? {}
      )
    }
  }, [product.variants])

  /**
   * ==========================================================
   * SELECTED VARIANT
   * ==========================================================
   */
  const selectedVariant = useMemo(() => {
    if (
      !product.variants ||
      product.variants.length === 0
    ) {
      return
    }

    return product.variants.find(
      (variant) => {
        const variantOptions =
          optionsAsKeymap(
            variant.options
          )

        return isEqual(
          variantOptions,
          options
        )
      }
    )
  }, [
    product.variants,
    options,
  ])

  /**
   * ==========================================================
   * UPDATE OPTION
   * ==========================================================
   */
  const setOptionValue = (
    optionId: string,
    value: string
  ) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  /**
   * ==========================================================
   * VALID VARIANT CHECK
   * ==========================================================
   */
  const isValidVariant = useMemo(() => {
    return product.variants?.some(
      (variant) => {
        const variantOptions =
          optionsAsKeymap(
            variant.options
          )

        return isEqual(
          variantOptions,
          options
        )
      }
    )
  }, [
    product.variants,
    options,
  ])

  /**
   * ==========================================================
   * UPDATE URL WITH SELECTED VARIANT
   * ==========================================================
   */
  useEffect(() => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      )

    const value =
      isValidVariant
        ? selectedVariant?.id
        : null

    if (
      params.get("v_id") === value
    ) {
      return
    }

    if (value) {
      params.set(
        "v_id",
        value
      )
    } else {
      params.delete("v_id")
    }

    const queryString =
      params.toString()

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    )
  }, [
    selectedVariant,
    isValidVariant,
    pathname,
    router,
    searchParams,
  ])

  /**
   * ==========================================================
   * STOCK CHECK
   * ==========================================================
   */
  const inStock = useMemo(() => {
    /**
     * If inventory isn't managed,
     * product can always be added.
     */
    if (
      selectedVariant &&
      !selectedVariant.manage_inventory
    ) {
      return true
    }

    /**
     * Backorders are allowed.
     */
    if (
      selectedVariant?.allow_backorder
    ) {
      return true
    }

    /**
     * Inventory is available.
     */
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant.inventory_quantity ||
        0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  /**
   * ==========================================================
   * INTERSECTION / MOBILE ACTIONS
   * ==========================================================
   */
  const actionsRef =
    useRef<HTMLDivElement>(null)

  const inView = useIntersection(
    actionsRef,
    "0px"
  )

  /**
   * ==========================================================
   * ADD TO CART
   * ==========================================================
   *
   * Calls the optimized server action from:
   *
   * src/lib/data/cart.ts
   *
   * The cart logic itself remains completely
   * separate from this client component.
   */
  const handleAddToCart =
    async () => {
      /**
       * No valid variant.
       */
      if (
        !selectedVariant?.id
      ) {
        return
      }

      /**
       * Prevent duplicate clicks
       * while the previous request is running.
       */
      if (isAdding) {
        return
      }

      setIsAdding(true)

      try {
        await addToCart({
          variantId:
            selectedVariant.id,
          quantity: 1,
          countryCode,
        })
      } catch (error) {
        console.error(
          "Add to cart failed:",
          error
        )
      } finally {
        setIsAdding(false)
      }
    }

  /**
   * ==========================================================
   * RENDER
   * ==========================================================
   */
  return (
    <>
      <div
        className="flex flex-col gap-y-2"
        ref={actionsRef}
      >
        <div>
          {(product.variants
            ?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map(
                (option) => {
                  return (
                    <div
                      key={option.id}
                    >
                      <OptionSelect
                        option={option}
                        current={
                          options[
                            option.id
                          ]
                        }
                        updateOption={
                          setOptionValue
                        }
                        title={
                          option.title ??
                          ""
                        }
                        data-testid="product-options"
                        disabled={
                          !!disabled ||
                          isAdding
                        }
                      />
                    </div>
                  )
                }
              )}

              <Divider />
            </div>
          )}
        </div>

        <ProductPrice
          product={product}
          variant={selectedVariant}
        />

        <Button
          onClick={
            handleAddToCart
          }
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant &&
          !options
            ? "Select variant"
            : !inStock ||
              !isValidVariant
            ? "Out of stock"
            : "Add to cart"}
        </Button>

        <MobileActions
          product={product}
          variant={
            selectedVariant
          }
          options={options}
          updateOptions={
            setOptionValue
          }
          inStock={inStock}
          handleAddToCart={
            handleAddToCart
          }
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={
            !!disabled ||
            isAdding
          }
        />
      </div>
    </>
  )
}