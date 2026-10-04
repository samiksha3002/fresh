
"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import ProductReviews from "@modules/products/components/product-reviews/ProductReviews"
import ProductTabs from "@modules/products/components/product-tabs"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
}

const ProductTemplate = ({
  product,
  region,
  countryCode,
  images = [],
}: ProductTemplateProps) => {
  const productImages =
    images.length > 0
      ? images
      : product.images ||
        (product.thumbnail
          ? [{ url: product.thumbnail }]
          : [])

  const [activeImage, setActiveImage] = useState(0)

  const currentImage = productImages[activeImage]?.url

  const goToPreviousImage = () => {
    if (productImages.length <= 1) return

    setActiveImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    )
  }

  const goToNextImage = () => {
    if (productImages.length <= 1) return

    setActiveImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">

        {/* LEFT: PRODUCT IMAGE */}
        <div className="flex min-w-0 flex-col gap-3 lg:sticky lg:top-4">
          <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-sm border border-zinc-300 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:h-[420px] lg:h-[min(65vh,520px)] lg:min-h-[400px]">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.title}
                className="h-full w-full object-contain p-5 sm:p-7"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                No product image available
              </div>
            )}

            {/* Image navigation */}
            {productImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  aria-label="Previous product image"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-zinc-900 shadow-md transition hover:bg-zinc-100"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={goToNextImage}
                  aria-label="Next product image"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-zinc-900 shadow-md transition hover:bg-zinc-100"
                >
                  ›
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-sm">
                  {productImages.map((image, index) => (
                    <button
                      key={image.id || index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`h-2 w-2 rounded-full transition ${
                        activeImage === index
                          ? "bg-zinc-900"
                          : "bg-zinc-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {productImages.map((image, index) => (
                <button
                  key={image.id || index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-white p-1 transition ${
                    activeImage === index
                      ? "border border-zinc-800"
                      : "border border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="flex min-w-0 flex-col gap-3 text-zinc-900">

          {/* Product title and subtitle */}
          <div>
            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-zinc-950 sm:text-4xl lg:text-[38px]">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="mt-1.5 text-sm leading-5 text-zinc-700 sm:text-base">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Description, Benefits, How to Use */}
          <div className="min-w-0 text-zinc-800 [&_*]:max-w-full">
            <ProductTabs product={product} />
          </div>

          {/* Product tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-[#f3f0eb] px-3 py-1 text-xs font-medium text-zinc-800"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          )}

          {/* Purchase actions
              ProductActions already renders the selected variant price.
              Do not render formattedPrice separately here. */}
          <div className="mt-1">
            <ProductActions
              product={product}
              region={region}
            />
          </div>

          {/* Supporting information */}
          <div className="mt-1 space-y-3 border-t border-zinc-200 pt-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                About this product
              </h2>
              <p className="mt-1 text-sm leading-5 text-zinc-700">
                Discover more about {product.title} and how it fits into
                your skincare routine.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                Shipping &amp; Returns
              </h2>
              <p className="mt-1 text-sm leading-5 text-zinc-700">
                Carefully packed and shipped to your address. Please check
                our shipping and return policy for more information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      <div className="mt-10 lg:mt-14">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}

export default ProductTemplate
