
"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type BestSellerProduct = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  description: string | null
  price: string | null
}

type Props = {
  products: BestSellerProduct[]
}

export default function BestSellersClient({ products }: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<BestSellerProduct | null>(null)

  useEffect(() => {
    if (!selectedProduct) return

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProduct(null)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProduct])

  return (
    <>
      <section className="w-full bg-[var(--kt-cream)]">
        <div className="content-container">
          {/* HEADER */}
          <div className="flex flex-col px-2 pb-8 pt-14 sm:px-0 sm:pb-10 sm:pt-16 md:flex-row md:items-end md:justify-between lg:pb-12 lg:pt-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kt-secondary)]">
                Customer Favourites
              </p>

              <h2 className="mt-3 text-[36px] font-normal leading-tight tracking-[-0.04em] text-[var(--kt-primary)] sm:text-[44px] md:text-[52px]">
                Best Sellers
              </h2>

              <p className="mt-3 max-w-md text-[12px] leading-6 text-[var(--kt-secondary)] sm:text-[13px]">
                Discover the skincare essentials customers love.
              </p>
            </div>

            <LocalizedClientLink
              href="/store"
              className="group mt-5 inline-flex w-fit items-center gap-3 border-b border-[var(--kt-border-strong)] pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--kt-primary)] transition-colors duration-300 hover:border-[var(--kt-accent)] hover:text-[var(--kt-accent)] md:mt-0"
            >
              Shop All
              <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </LocalizedClientLink>
          </div>

          {/* PRODUCT GRID */}
          <div className="border-t border-[var(--kt-border)] pb-12 pt-7 sm:pb-14 sm:pt-9 md:pb-16">
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group min-w-0"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative overflow-hidden bg-[var(--kt-white)]">
                    <LocalizedClientLink
                      href={`/products/${product.handle}`}
                      className="block"
                      aria-label={`View ${product.title}`}
                    >
                      <div className="relative flex aspect-[4/3.8] items-center justify-center overflow-hidden">
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-contain p-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-center text-[9px] uppercase tracking-[0.2em] text-[var(--kt-secondary)]">
                              Kovea Touch
                            </span>
                          </div>
                        )}
                      </div>
                    </LocalizedClientLink>

                    {/* SUBTLE CORNER LABEL */}
                    <span className="pointer-events-none absolute left-2 top-2 bg-[var(--kt-cream)] px-2 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[var(--kt-secondary)] sm:left-3 sm:top-3">
                      Bestseller
                    </span>

                    {/* QUICK VIEW: HOVER ON DESKTOP, VISIBLE ON TOUCH */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        aria-label={`Quick view ${product.title}`}
                        className="flex w-full translate-y-0 items-center justify-center gap-2 bg-[var(--kt-primary)] px-3 py-3 text-[9px] font-medium uppercase tracking-[0.16em] text-white opacity-100 transition-all duration-300 hover:bg-[var(--kt-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kt-accent)] sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
                      >
                        Quick View
                        <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="pt-3 sm:pt-4">
                    <LocalizedClientLink
                      href={`/products/${product.handle}`}
                      className="block"
                    >
                      <h3 className="line-clamp-2 min-h-[2.7em] text-[13px] font-medium leading-[1.4] text-[var(--kt-primary)] transition-colors duration-300 group-hover:text-[var(--kt-accent)] sm:text-[15px]">
                        {product.title}
                      </h3>
                    </LocalizedClientLink>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      {product.price && (
                        <p className="text-[13px] font-semibold text-[var(--kt-primary)] sm:text-[14px]">
                          {product.price}
                        </p>
                      )}

                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className="inline-flex shrink-0 items-center gap-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--kt-secondary)] transition-colors hover:text-[var(--kt-accent)]"
                      >
                        View
                        <span aria-hidden="true">→</span>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="h-8 sm:h-10 md:h-12" />
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-[2px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null)
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="relative my-auto grid w-full max-w-3xl overflow-hidden bg-[var(--kt-cream)] shadow-2xl sm:grid-cols-2"
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--kt-border)] bg-white text-xl text-[var(--kt-primary)] transition-colors hover:bg-[var(--kt-sand)]"
            >
              ×
            </button>

            {/* MODAL IMAGE */}
            <div className="flex min-h-[220px] items-center justify-center bg-white p-6 sm:min-h-[380px] sm:p-8">
              {selectedProduct.thumbnail ? (
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="max-h-[320px] w-full object-contain sm:max-h-[420px]"
                />
              ) : (
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--kt-secondary)]">
                  Kovea Touch
                </span>
              )}
            </div>

            {/* MODAL DETAILS */}
            <div className="flex flex-col justify-center p-6 sm:p-9 md:p-10">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--kt-secondary)]">
                Kovea Touch · Product Details
              </p>

              <h2
                id="quick-view-title"
                className="mt-4 text-2xl font-normal leading-snug text-[var(--kt-primary)] sm:text-3xl"
              >
                {selectedProduct.title}
              </h2>

              {selectedProduct.price && (
                <p className="mt-4 text-base font-semibold text-[var(--kt-primary)]">
                  {selectedProduct.price}
                </p>
              )}

              {selectedProduct.description && (
                <p className="mt-5 line-clamp-5 whitespace-pre-line text-sm leading-6 text-[var(--kt-secondary)]">
                  {selectedProduct.description}
                </p>
              )}

              <LocalizedClientLink
                href={`/products/${selectedProduct.handle}`}
                onClick={() => setSelectedProduct(null)}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--kt-primary)] px-5 py-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[var(--kt-accent)]"
              >
                View Full Product
                <span aria-hidden="true">→</span>
              </LocalizedClientLink>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="mt-4 self-center text-[10px] uppercase tracking-[0.16em] text-[var(--kt-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--kt-primary)]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
