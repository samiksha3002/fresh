"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

const categoryImages: Record<string, string> = {
  "acne":
    "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",

  "aging":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",

  "body-pigmentation":
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",

  "dark-knees-elbows":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",

  "dark-underarms-dark-neck":
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",

  "hair-loss-care":
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",

  "kp-strawberry-legs":
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",

  "large-pores-texture":
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",

  "lip-eye-care":
    "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",

  "mild-moderate-pigmentation":
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",

  "oily-skin":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",

  "pregnancy-safe":
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",

  "scar-treatment":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",

  "sensitive-skin-barrier-repair-dry-skin":
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",

  "skintags-razor-bumps":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",

  "stubborn-pigmentation":
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",

  "tinea-versicolor-dandruff-hibiclens":
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
}

const fallbackImage =
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"

const HomeCategoriesClient = ({ categories }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const slide = (direction: "left" | "right") => {
    if (!sliderRef.current) return

    const slider = sliderRef.current
    const scrollAmount = 280

    const start = slider.scrollLeft
    const target =
      direction === "left"
        ? start - scrollAmount
        : start + scrollAmount

    const change = target - start
    const duration = 600

    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      const ease = 1 - Math.pow(1 - progress, 4)

      slider.scrollLeft = start + change * ease

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <div className="py-16 bg-white">
      <div className="content-container mx-auto px-6 md:px-8 max-w-7xl">

        <div className="mb-8">
          <h2 className="text-3xl font-normal tracking-tight text-zinc-900 font-serif">
            Shop by Category
          </h2>
        </div>

        <div className="relative w-full">

          <style
            dangerouslySetInnerHTML={{
              __html: `
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }

                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `,
            }}
          />

          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-5 hide-scrollbar pb-6 pt-2 cursor-grab active:cursor-grabbing"
          >

            {categories.map((category) => {
              const image =
                categoryImages[category.handle] || fallbackImage

              return (
                <LocalizedClientLink
                  key={category.id}
                  href={`/store?category=${category.handle}`}
                  className="shrink-0 w-[240px] group flex flex-col justify-between bg-white border border-zinc-200/60 rounded-3xl p-6 transition-all duration-500 ease-out hover:border-zinc-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 min-h-[280px]"
                >

                  <div className="w-full h-36 flex items-center justify-center mb-6">
                    <img
                      src={image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:drop-shadow-md group-hover:scale-[1.03] transition-all duration-500 ease-out"
                    />
                  </div>

                  <span className="text-sm md:text-base font-medium text-zinc-800 text-center group-hover:text-black tracking-tight transition-colors duration-300">
                    {category.name}
                  </span>

                </LocalizedClientLink>
              )
            })}

          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">

          <button
            onClick={() => slide("left")}
            className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 hover:shadow-md active:scale-95 transition-all duration-300 text-zinc-600"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 px-3">
            <span className="w-6 h-1.5 rounded-full bg-zinc-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          </div>

          <button
            onClick={() => slide("right")}
            className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 hover:shadow-md active:scale-95 transition-all duration-300 text-zinc-600"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

        </div>

      </div>
    </div>
  )
}

export default HomeCategoriesClient