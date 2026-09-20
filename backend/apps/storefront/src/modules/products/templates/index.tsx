"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"

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
      : product.images || (product.thumbnail ? [{ url: product.thumbnail }] : [])

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
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* =====================================================
            LEFT COLUMN — PRODUCT IMAGE GALLERY
        ====================================================== */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24">

          <div className="relative bg-[#e9f2eb] rounded-3xl p-8 flex items-center justify-center min-h-[500px] overflow-hidden group border border-black/5">

            {/* Zoom Button */}
            <button
              type="button"
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
              aria-label="Zoom product image"
            >
              <svg
                className="w-5 h-5 text-zinc-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </button>

            {/* Actual Product Image */}
            <div className="w-full h-[420px] flex items-center justify-center">

              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-64 h-96 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm flex items-center justify-center text-zinc-500 font-medium">
                  No Image
                </div>
              )}

            </div>

            {/* Image Navigation */}
            {productImages.length > 1 && (
              <div className="absolute bottom-6 flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">

                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className="text-sm font-semibold hover:text-zinc-500 transition"
                  aria-label="Previous image"
                >
                  ←
                </button>

                <div className="flex gap-1.5">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeImage
                          ? "bg-black"
                          : "bg-zinc-300"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNextImage}
                  className="text-sm font-semibold hover:text-zinc-500 transition"
                  aria-label="Next image"
                >
                  →
                </button>

              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {productImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={image.id || index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border transition ${
                    activeImage === index
                      ? "border-black"
                      : "border-zinc-200"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            RIGHT COLUMN — PRODUCT DETAILS
        ====================================================== */}
        <div className="flex flex-col gap-6">

          {/* Product Title */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif font-normal text-zinc-900 tracking-tight">
              {product.title}
            </h1>

            {/* Optional subtitle */}
            {product.subtitle && (
              <p className="text-sm text-zinc-500 mt-2">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="border-t border-zinc-100 pt-5">
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Product Metadata / Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          )}

          {/* Product Information */}
          <div className="border-t border-zinc-100 pt-5">

            <div className="grid grid-cols-2 gap-4">

              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-400">
                  Product
                </span>

                <p className="text-sm text-zinc-800 mt-1">
                  {product.title}
                </p>
              </div>

              {product.variants?.[0]?.sku && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400">
                    SKU
                  </span>

                  <p className="text-sm text-zinc-800 mt-1">
                    {product.variants[0].sku}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* =====================================================
              MEDUSA PRODUCT ACTIONS
              
              This handles:
              - Variant selection
              - Price
              - Inventory
              - Add to cart
              - Cart API
          ====================================================== */}

          <div className="border-t border-zinc-100 pt-6">
            <ProductActions
              product={product}
              region={region}
            />
          </div>

          {/* Buy Now — keep disabled for now */}
          <button
            type="button"
            className="w-full bg-white border border-zinc-300 text-zinc-900 py-4 rounded-full font-medium hover:bg-zinc-50 transition"
          >
            Buy it now
          </button>

          {/* Product Details */}
          <div className="border-t border-zinc-100 pt-6">

            <div className="flex flex-col gap-4">

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  About this product
                </h3>

                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                  Discover more about {product.title} and how it fits into
                  your skincare routine.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  Shipping & Returns
                </h3>

                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                  Carefully packed and shipped to your address. Please check
                  our shipping and return policy for more information.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductTemplate