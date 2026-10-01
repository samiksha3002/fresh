"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

const categoryImages: Record<string, string> = {
  acne: "/acne.png",
  aging: "/aging.png",
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

const fallbackImage = "/categories/default.jpg"

const HomeCategoriesClient = ({ categories }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const slide = (direction: "left" | "right") => {
    if (!sliderRef.current) return

    sliderRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    })
  }

  return (
    <section className="bg-white pt-8 pb-1 md:pt-10 md:pb-2">
      <div className="content-container mx-auto max-w-7xl px-6 md:px-8">

        {/* ===================================================== */}
        {/* HEADING */}
        {/* ===================================================== */}

        <div className="mb-5">
          <h2 className="font-serif text-[30px] font-normal tracking-tight text-[#2b2724] md:text-[32px]">
            Shop by Category
          </h2>
        </div>

        {/* ===================================================== */}
        {/* CATEGORY CAROUSEL */}
        {/* ===================================================== */}

        <div className="relative">

          <style
            dangerouslySetInnerHTML={{
              __html: `
                .category-circle-scroll::-webkit-scrollbar {
                  display: none;
                }

                .category-circle-scroll {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `,
            }}
          />

          <div
            ref={sliderRef}
            className="
              category-circle-scroll
              flex
              gap-7
              overflow-x-auto
              px-1
              pt-1
              pb-0
              sm:gap-8
              md:gap-9
            "
          >
            {categories.map((category) => {
              const image =
                categoryImages[category.handle] || fallbackImage

              return (
                <LocalizedClientLink
                  key={category.id}
                  href={`/store?category=${category.handle}`}
                  className="
                    group
                    relative
                    w-[118px]
                    shrink-0
                    sm:w-[128px]
                    md:w-[135px]
                  "
                >
                  {/* ================================================= */}
                  {/* CIRCLE IMAGE */}
                  {/* ================================================= */}

                  <div
                    className="
                      relative
                      h-[108px]
                      w-[108px]
                      rounded-full
                      bg-[#f4eee8]
                      p-[4px]
                      transition-all
                      duration-500
                      ease-out
                      group-hover:-translate-y-1
                      group-hover:shadow-[0_12px_30px_rgba(43,39,36,0.12)]
                      sm:h-[116px]
                      sm:w-[116px]
                      md:h-[122px]
                      md:w-[122px]
                    "
                  >
                    {/* Outer Ring */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#2b2724]/[0.08]
                        transition-all
                        duration-500
                        group-hover:border-[#96745c]/30
                      "
                    />

                    {/* Image */}
                    <div className="h-full w-full overflow-hidden rounded-full bg-[#eee7df]">
                      <img
                        src={image}
                        alt={category.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.06]
                        "
                      />
                    </div>

                    {/* Hover Arrow */}
                    <span
                      className="
                        absolute
                        bottom-0
                        right-0
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white
                        bg-[#2b2724]
                        text-white
                        opacity-0
                        shadow-[0_4px_12px_rgba(43,39,36,0.18)]
                        transition-all
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* ================================================= */}
                  {/* CATEGORY NAME */}
                  {/* ================================================= */}

                  <div className="mt-3 min-h-[34px] pr-1">
                    <span
                      className="
                        block
                        text-left
                        text-[12px]
                        font-medium
                        leading-[17px]
                        tracking-[-0.01em]
                        text-[#2b2724]
                        transition-colors
                        duration-300
                        group-hover:text-[#765d49]
                        md:text-[13px]
                      "
                    >
                      {category.name}
                    </span>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>

          {/* ===================================================== */}
          {/* NAVIGATION */}
          {/* ===================================================== */}

          <div className="mt-4 flex items-center justify-center">

            {/* Previous */}
            <button
              type="button"
              onClick={() => slide("left")}
              aria-label="Previous categories"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#2b2724]/10
                bg-white
                text-[#766c63]
                transition-all
                duration-300
                hover:border-[#2b2724]/20
                hover:bg-[#f7f3ee]
                hover:text-[#2b2724]
                active:scale-95
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Indicators */}
            <div className="mx-4 flex items-center gap-2">
              <span className="h-[3px] w-7 rounded-full bg-[#2b2724]" />
              <span className="h-[3px] w-[3px] rounded-full bg-[#d8c9be]" />
              <span className="h-[3px] w-[3px] rounded-full bg-[#d8c9be]" />
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => slide("right")}
              aria-label="Next categories"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#2b2724]/10
                bg-white
                text-[#766c63]
                transition-all
                duration-300
                hover:border-[#2b2724]/20
                hover:bg-[#f7f3ee]
                hover:text-[#2b2724]
                active:scale-95
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCategoriesClient