
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
): Record<string, string> => {
  return (
    variantOptions?.reduce(
      (acc: Record<string, string>, varopt) => {
        if (varopt.option_id && varopt.value) {
          acc[varopt.option_id] = varopt.value
        }
        return acc
      },
      {} as Record<string, string>
    ) ?? {}
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

  const countryCode = params.countryCode as string

  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  )
  const [isAdding, setIsAdding] = useState(false)
  const [optimisticAdded, setOptimisticAdded] = useState(false)

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return undefined

    return product.variants.find((variant) =>
      isEqual(optionsAsKeymap(variant.options), options)
    )
  }, [product.variants, options])

  const isValidVariant = useMemo(() => {
    if (!selectedVariant) return false

    return isEqual(optionsAsKeymap(selectedVariant.options), options)
  }, [selectedVariant, options])

  // Preselect options when the product has exactly one variant.
  useEffect(() => {
    if (product.variants?.length !== 1) return

    setOptions(optionsAsKeymap(product.variants[0].options))
  }, [product.id, product.variants])

  const setOptionValue = useCallback(
    (optionId: string, value: string) => {
      setOptions((prev) => ({
        ...prev,
        [optionId]: value,
      }))
    },
    []
  )

  // Keep the selected variant in the URL without navigating when unchanged.
  useEffect(() => {
    const currentVariantId = searchParams.get("v_id")
    const nextVariantId = isValidVariant ? selectedVariant?.id : null

    if (currentVariantId === nextVariantId) return

    const nextParams = new URLSearchParams(searchParams.toString())

    if (nextVariantId) {
      nextParams.set("v_id", nextVariantId)
    } else {
      nextParams.delete("v_id")
    }

    const queryString = nextParams.toString()
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname

    router.replace(nextUrl, { scroll: false })
  }, [
    selectedVariant?.id,
    isValidVariant,
    pathname,
    router,
    searchParams,
  ])

  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    if (!selectedVariant.manage_inventory) return true
    if (selectedVariant.allow_backorder) return true

    return (selectedVariant.inventory_quantity ?? 0) > 0
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = useCallback(async () => {
    if (
      !selectedVariant?.id ||
      !isValidVariant ||
      !inStock ||
      disabled ||
      isAdding
    ) {
      return
    }

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })

      setOptimisticAdded(true)
    } catch (error) {
      console.error("Add to cart failed:", error)
      setOptimisticAdded(false)
    } finally {
      setIsAdding(false)
    }
  }, [
    selectedVariant?.id,
    isValidVariant,
    inStock,
    disabled,
    isAdding,
    countryCode,
  ])

  useEffect(() => {
    if (!optimisticAdded) return

    const timeoutId = setTimeout(() => {
      setOptimisticAdded(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [optimisticAdded])

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4">
          {(product.options || []).map((option) => (
            <div key={option.id}>
              <OptionSelect
                option={option}
                current={options[option.id]}
                updateOption={setOptionValue}
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            </div>
          ))}
          <Divider />
        </div>
      )}

      <ProductPrice product={product} variant={selectedVariant} />

      <Button
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          !isValidVariant
        }
        variant="primary"
        className="h-10 w-full"
        isLoading={isAdding}
        data-testid="add-product-button"
      >
        {optimisticAdded
          ? "Added!"
          : !selectedVariant
            ? "Select variant"
            : !inStock
              ? "Out of stock"
              : "Add to cart"}
      </Button>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock && isValidVariant}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}
