import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function BestSellers({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
      order: "-created_at",
      fields:
        "id,title,handle,thumbnail,description,*variants.calculated_price",
    },
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-white">
      <div className="content-container">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="flex flex-col px-6 pb-12 pt-20 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-16 md:pt-24 lg:px-0">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a857c]">
              Customer Favourites
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-normal leading-[0.98] tracking-[-0.035em] text-[#25231f] sm:text-[50px] md:text-[58px]">
              Best Sellers
            </h2>
          </div>

          <LocalizedClientLink
            href="/store"
            className="group mt-7 inline-flex w-fit items-center gap-3 border-b border-[#25231f]/20 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#25231f] transition-all duration-300 hover:border-[#25231f] md:mt-0"
          >
            Shop All

            <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </LocalizedClientLink>

        </div>

        {/* =========================================================
            PRODUCTS
        ========================================================= */}
        <div className="border-t border-[#25231f]/8 px-5 py-10 sm:px-8 sm:py-12 lg:px-0 lg:py-14">

          <div className="grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-10">

            {products.map((product) => {
              const variant = product.variants?.[0]

              const calculatedPrice =
                variant?.calculated_price

              const amount =
                calculatedPrice?.calculated_amount

              const currencyCode =
                calculatedPrice?.currency_code

              const formattedPrice =
                amount !== undefined && amount !== null
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency:
                        currencyCode?.toUpperCase() || "USD",
                    }).format(amount)
                  : null

              return (
                <article
                  key={product.id}
                  className="group min-w-0"
                >

                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}
                  <LocalizedClientLink
                    href={`/products/${product.handle}`}
                    className="block"
                  >
                    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#FAF9F6]">

                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.035] sm:p-8"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-[9px] uppercase tracking-[0.24em] text-[#aaa49a]">
                            Kovea Touch
                          </span>
                        </div>
                      )}

                    </div>
                  </LocalizedClientLink>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}
                  <div className="pt-5">

                    <div className="flex items-start justify-between gap-4">

                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className="min-w-0"
                      >
                        <h3 className="font-serif text-[17px] font-normal leading-[1.25] tracking-[-0.015em] text-[#25231f] transition-colors duration-300 group-hover:text-[#69645c] sm:text-[19px]">
                          {product.title}
                        </h3>
                      </LocalizedClientLink>

                      {formattedPrice && (
                        <span className="shrink-0 pt-[2px] text-[12px] font-medium text-[#4f4b44]">
                          {formattedPrice}
                        </span>
                      )}

                    </div>

                    {/* PRODUCT LINK */}
                    <LocalizedClientLink
                      href={`/products/${product.handle}`}
                      className="mt-4 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#99938a] transition-colors duration-300 hover:text-[#25231f]"
                    >
                      View Product

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </LocalizedClientLink>

                  </div>

                </article>
              )
            })}

          </div>

        </div>

        {/* =========================================================
            SMALL BOTTOM SPACING
        ========================================================= */}
        <div className="h-16 bg-white sm:h-20 md:h-24" />

      </div>
    </section>
  )
}