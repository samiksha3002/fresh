import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-white">
      <div className="content-container">

        {/* =====================================================
            COLLECTION HEADER
        ===================================================== */}
        <div className="flex flex-col px-6 pb-12 pt-20 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-16 md:pt-24 lg:px-0">

          <div className="max-w-2xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a857c]">
              Explore the collection
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-normal leading-[0.98] tracking-[-0.035em] text-[#25231f] sm:text-[50px] md:text-[58px]">
              {collection.title}
            </h2>

            <p className="mt-5 max-w-lg text-[13px] leading-7 text-[#77736b]">
              Thoughtfully selected essentials for your everyday
              skincare ritual.
            </p>

          </div>

          {/* VIEW COLLECTION */}
          <div className="mt-7 md:mt-0">

            <InteractiveLink
              href={`/collections/${collection.handle}`}
              className="group inline-flex items-center gap-3 border-b border-[#25231f]/20 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#25231f] transition-all duration-300 hover:border-[#25231f]"
            >
              View All

              <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </InteractiveLink>

          </div>

        </div>

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}
        <div className="border-t border-[#25231f]/8 px-5 py-10 sm:px-8 sm:py-12 lg:px-0 lg:py-14">

          <ul className="grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-20">

            {pricedProducts.map((product) => (
              <li
                key={product.id}
                className="group min-w-0"
              >
                <div className="transition-transform duration-500 group-hover:-translate-y-1">

                  <ProductPreview
                    product={product}
                    region={region}
                    isFeatured
                  />

                </div>
              </li>
            ))}

          </ul>

        </div>

        {/* =====================================================
            SIMPLE COLLECTION LINK
        ===================================================== */}
        <div className="flex justify-center px-6 pb-20 pt-4 sm:pb-24">

          <InteractiveLink
            href={`/collections/${collection.handle}`}
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#6f6a62] transition-colors duration-300 hover:text-[#25231f]"
          >
            Explore {collection.title}

            <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </InteractiveLink>

        </div>

      </div>
    </section>
  )
} 