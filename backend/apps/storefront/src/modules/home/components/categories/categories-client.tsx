
"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

const categoryImages: Record<string, string> = {
  acne: "/Acne.png",
  aging: "/Aging.png",
  "body-pigmentation": "/pigmenentaion.png",
  "dark-knees-elbows": "/elbow.png",
  "dark-underarms-dark-neck": "/underarms.png",
  "kp-strawberry-legs": "/strawberry.png",
  "large-pores-texture": "/large pores and texture.png",
  "lip-eye-care": "/lip-eye-care.jpg",
  "mild-moderate-pigmentation": "/mild-moderate-pigmentation.jpg",
  "oily-skin": "/categories/oily-skin.jpg",
  "pregnancy-safe": "/categories/pregnancy-safe.jpg",
  "scar-treatment": "/categories/scar-treatment.jpg",
  "sensitive-skin-barrier-repair-dry-skin":
    "/categories/sensitive-skin-barrier-repair-dry-skin.jpg",
  "skintags-razor-bumps": "/categories/skintags-razor-bumps.jpg",
  "stubborn-pigmentation": "/categories/stubborn-pigmentation.jpg",
  "tinea-versicolor-dandruff-hibiclens":
    "/categories/tinea-versicolor-dandruff-hibiclens.jpg",
}

const HomeCategoriesClient = ({ categories }: Props) => {
  // Show exactly six categories in the homepage section.
  const visibleCategories = categories.slice(0, 6)

  return (
    <section className="bg-white py-10 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#9b795e]">
            Find your skincare ritual
          </p>

          <h2 className="font-serif text-[29px] font-normal tracking-tight text-[#29231f] sm:text-[34px] md:text-[38px]">
            Shop by Category
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#81756b]">
            Discover skincare selected for your skin concerns.
          </p>
        </div>

        {/* Six evenly spaced categories */}
        <div
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-0"
          aria-label="Shop skincare categories"
        >
          {visibleCategories.map((category) => {
            const image = categoryImages[category.handle]

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/store?category=${category.handle}`}
                className="group flex min-w-0 flex-col items-center text-center"
              >
                {/* Consistent circular image */}
                <div className="w-full max-w-[116px] rounded-full border border-[#e8ddd2] bg-[#f7f3ee] p-[5px] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#b99b7d] group-hover:shadow-[0_8px_24px_rgba(79,57,39,0.12)] sm:max-w-[132px] lg:max-w-[144px]">
                  <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#eee5dc]">
                    {image ? (
                      <img
                        src={image}
                        alt={category.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="flex h-full min-h-0 items-center justify-center px-3 text-center font-serif text-sm text-[#8c7664]">
                        {category.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Consistently aligned category name */}
                <span className="mt-3 flex min-h-[40px] w-full items-start justify-center px-1 text-center text-[12px] font-medium leading-5 text-[#332a24] transition-colors duration-300 group-hover:text-[#9b795e] sm:mt-4 sm:text-[13px] lg:text-[12px] xl:text-[13px]">
                  {category.name}
                </span>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeCategoriesClient
