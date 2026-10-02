
import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"

import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const brand =
    product.metadata?.brand &&
    typeof product.metadata.brand === "string"
      ? product.metadata.brand
      : null

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <article
        data-testid="product-wrapper"
        className="flex h-full flex-col overflow-hidden rounded-sm border border-[#e9e3dc] bg-white transition-all duration-300 hover:border-[#c9b49d] hover:shadow-[0_8px_30px_rgba(64,45,28,0.07)]"
      >
        {/* Product image */}
        <div className="relative bg-[#f8f6f2] p-3 sm:p-4">
          <div className="aspect-[4/5] overflow-hidden bg-white">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-1 flex-col px-3 pb-4 pt-4 sm:px-4 sm:pb-5">
          {brand && (
            <Text className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8b7865]">
              {brand}
            </Text>
          )}

          <Text
            className="line-clamp-2 min-h-[2.8rem] text-sm leading-5 text-[#302b27] transition-colors group-hover:text-[#967354]"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          <div className="mt-3">
            {cheapestPrice && (
              <PreviewPrice price={cheapestPrice} />
            )}
          </div>

          <div className="mt-4 flex min-h-10 items-center justify-center border border-[#b8a38e] px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-[#3b342e] transition-colors duration-200 group-hover:bg-[#3b342e] group-hover:text-white">
            View Product
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
