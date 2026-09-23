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
    <section className="w-full border-t border-[#25231f]/10 bg-white">
      <div className="content-container">

        {/* =====================================================
            COLLECTION INTRO
        ===================================================== */}
        <div className="flex flex-col gap-8 py-16 sm:py-20 md:flex-row md:items-end md:justify-between md:py-24">

          {/* Left */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#25231f]/30" />

              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#817b70]">
                The Collection
              </p>
            </div>

            <h2 className="mt-5 font-serif text-[42px] font-normal leading-[1] tracking-[-0.035em] text-[#282622] sm:text-[52px] md:text-[60px]">
              {collection.title}
            </h2>

            <p className="mt-5 max-w-xl text-[13px] leading-7 text-[#777168]">
              Thoughtfully selected essentials for a considered
              everyday skincare ritual.
            </p>
          </div>

          {/* View All */}
          <div className="md:pb-2">
            <InteractiveLink
              href={`/collections/${collection.handle}`}
              className="group inline-flex items-center gap-4 border-b border-[#282622]/30 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#282622] transition-colors duration-300 hover:border-[#282622]"
            >
              View Collection

              <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </InteractiveLink>
          </div>
        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}
        <div className="border-t border-[#25231f]/10 bg-[#f7f5f0] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-20">
            {pricedProducts.map((product) => (
              <li
                key={product.id}
                className="group min-w-0"
              >
                <div className="overflow-hidden bg-white transition-all duration-500 group-hover:-translate-y-1">
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
            BOTTOM COLLECTION CTA
        ===================================================== */}
        <div className="flex justify-center bg-white py-14 sm:py-16">
          <InteractiveLink
            href={`/collections/${collection.handle}`}
            className="group inline-flex items-center gap-4 border border-[#282622]/20 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#282622] transition-all duration-300 hover:bg-[#282622] hover:text-white"
          >
            Explore {collection.title}

            <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </InteractiveLink>
        </div>

      </div>
    </section>
  )
}