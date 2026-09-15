"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const skincareCategories = [
  {
    name: "All Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=all-skincare"
  },
  {
    name: "Azelaic Acid",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=azelaic-acid"
  },
  {
    name: "Brighteners",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=brighteners"
  },
  {
    name: "Cleansers & Body Washes",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=cleansers-body-washes"
  },
  {
    name: "Exfoliants",
    image: "https://images.unsplash.com/photo-1615397323281-b5ab5392d04a?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=exfoliants"
  },
  {
    name: "Hair Care",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=hair-care"
  },
  {
    name: "Hydroquinone Break Products",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=hydroquinone-break-products"
  },
  {
    name: "Moisturizers",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=moisturizers"
  },
  {
    name: "Serums & Retinoids",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=serums-retinoids"
  },
  {
    name: "Sunscreens",
    image: "https://images.unsplash.com/photo-1556228726-952b096cabc9?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=sunscreens"
  },
  {
    name: "Toners/Essense/Ampoule",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=toners-essense-ampoule"
  },
  {
    name: "Vitamin C / Antioxidant",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=vitamin-c-antioxidant"
  }
]

const HomeCategories = () => {
  const sliderRef = useRef(null)

  // Custom buttery-smooth easing function (EaseOutQuart)
  const slide = (direction) => {
    if (!sliderRef.current) return

    const slider = sliderRef.current
    const scrollAmount = 280 // Roughly one card + gap
    const start = slider.scrollLeft
    const target = direction === "left" ? start - scrollAmount : start + scrollAmount
    const change = target - start
    const duration = 600 // 600ms makes it feel soft and relaxed
    let startTime = null

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing formula for a soft deceleration
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
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-normal tracking-tight text-zinc-900 font-serif">
            Shop by Category
          </h2>
        </div>

        {/* Categories Slider Container */}
        <div className="relative w-full">
          {/* Hide scrollbar completely but allow touch scrolling */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
          
          {/* Removed snap classes so the custom animation isn't interrupted */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-5 hide-scrollbar pb-6 pt-2 cursor-grab active:cursor-grabbing"
          >
            {skincareCategories.map((cat, index) => (
              <LocalizedClientLink 
                key={index} 
                href={cat.href}
                className="shrink-0 w-[240px] group flex flex-col justify-between bg-white border border-zinc-200/60 rounded-3xl p-6 transition-all duration-500 ease-out hover:border-zinc-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 min-h-[280px]"
              >
                {/* Floating Image Container with soft drop shadow */}
                <div className="w-full h-36 flex items-center justify-center mb-6">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:drop-shadow-md group-hover:scale-[1.03] transition-all duration-500 ease-out"
                  />
                </div>

                {/* Category Title */}
                <span className="text-sm md:text-base font-medium text-zinc-800 text-center group-hover:text-black tracking-tight transition-colors duration-300">
                  {cat.name}
                </span>
              </LocalizedClientLink>
            ))}
          </div>
        </div>

        {/* Carousel Slider Pagination Arrows */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button 
            onClick={() => slide("left")}
            className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 hover:shadow-md active:scale-95 transition-all duration-300 text-zinc-600"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <div className="flex items-center gap-2 px-3">
            <span className="w-6 h-1.5 rounded-full bg-zinc-800 transition-all duration-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 transition-all duration-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 transition-all duration-300"></span>
          </div>
          
          <button 
            onClick={() => slide("right")}
            className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 hover:shadow-md active:scale-95 transition-all duration-300 text-zinc-600"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default HomeCategories