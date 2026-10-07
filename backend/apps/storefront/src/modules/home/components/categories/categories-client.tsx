"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

const categoryImages: Record<string, string> = {
  acne: "/acne.jpg",
  aging: "/aging.jpg",
  "body-pigmentation": "/pigmentation.jpg",
  "dark-knees-elbows": "/elbow.png",
  "dark-underarms-dark-neck": "/underarms.png",
  "kp-strawberry-legs": "/strawberry.png",
  "large-pores-texture": "/large pore.jpg",
  "lip-eye-care": "/lip-eye-care.jpg",
  "mild-moderate-pigmentation": "/mild-moderate-pigmentation.jpg",
  "oily-skin": "/oily sceen.jpg",
  "pregnancy-safe": "/categories/pregnancy-safe.jpg",
  "scar-treatment": "/categories/scar-treatment.jpg",
  "sensitive-skin-barrier-repair-dry-skin":"/categories/sensitive-skin-barrier-repair-dry-skin.jpg",
  "skintags-razor-bumps":
    "/categories/skintags-razor-bumps.jpg",
  "stubborn-pigmentation":
    "/categories/stubborn-pigmentation.jpg",
  "tinea-versicolor-dandruff-hibiclens":
    "/categories/tinea-versicolor-dandruff-hibiclens.jpg",
}

const HomeCategoriesClient = ({ categories }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return

    const amount = sliderRef.current.clientWidth * 0.85

    sliderRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mb-8 sm:mb-9">
          <h2 className="text-[26px] font-medium tracking-[-0.03em] text-[#171717] sm:text-[28px] md:text-[30px]">
            Shop by Concerns
          </h2>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="
            flex
            gap-5
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            scrollbar-hide
            sm:gap-6
            md:gap-7
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category) => {
            const image = categoryImages[category.handle]

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/store?category=${category.handle}`}
                className="
                  group
                  min-w-[82%]
                  snap-start
                  sm:min-w-[47%]
                  md:min-w-[31.5%]
                  lg:min-w-[23.5%]
                "
              >
                {/* Image */}
                <div className="relative aspect-[1.32/1] w-full overflow-hidden bg-[#f4f1ed]">
                  {image ? (
                    <img
                      src={image}
                      alt={category.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.03]
                      "
                      onError={(event) => {
                        event.currentTarget.style.display = "none"
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-[#81756b]">
                      {category.name}
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <div className="pt-5 text-center">
                  <span
                    className="
                      text-[13px]
                      font-normal
                      tracking-[-0.01em]
                      text-[#292929]
                      sm:text-[14px]
                    "
                  >
                    {category.name}
                  </span>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>

        {/* Slider Controls */}
        <div className="mt-7 flex items-center justify-center gap-5">

          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            aria-label="Previous concerns"
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              text-[#777]
              transition-colors
              hover:text-black
            "
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L1 6L6 11"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>

          {/* Slider Indicator */}
          <div className="relative h-[4px] w-[60px] overflow-hidden rounded-full bg-[#e7e7e7]">
            <div className="absolute left-0 top-0 h-full w-[30px] rounded-full bg-black" />
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scrollSlider("right")}
            aria-label="Next concerns"
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              text-[#777]
              transition-colors
              hover:text-black
            "
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>

        </div>
      </div>
    </section>
  )
}

export default HomeCategoriesClient