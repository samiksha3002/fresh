import LocalizedClientLink from "@modules/common/components/localized-client-link"

const skincareCategories = [
  {
    name: "Cleansers & Toners",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=cleansers"
  },
  {
    name: "Serums & Oils",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=serums"
  },
  {
    name: "Moisturizers",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=moisturizers"
  },
  {
    name: "Face Masks",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=masks"
  },
  {
    name: "Sun Care",
    image: "https://images.unsplash.com/photo-1556228726-952b096cabc9?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=suncare"
  },
  {
    name: "Body Care",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=body"
  },
]

const HomeCategories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="content-container mx-auto px-6 md:px-8 max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-normal tracking-tight text-zinc-900 font-serif">
            Shop by Category
          </h2>
        </div>

        {/* Categories Cards Grid - Exact Shopify Local style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skincareCategories.map((cat, index) => (
            <LocalizedClientLink 
              key={index} 
              href={cat.href}
              className="group flex flex-col justify-between bg-white border border-zinc-200/80 rounded-3xl p-6 hover:border-zinc-400 transition-all duration-300 min-h-[280px]"
            >
              {/* Floating Image Container with soft drop shadow */}
              <div className="w-full h-36 flex items-center justify-center mb-6">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Category Title */}
              <span className="text-sm md:text-base font-medium text-zinc-900 text-center group-hover:text-black tracking-tight">
                {cat.name}
              </span>
            </LocalizedClientLink>
          ))}
        </div>

        {/* Carousel Slider Pagination Dots & Arrows (matching Shopify reference) */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition text-zinc-600 text-xs">
            ←
          </button>
          <div className="flex items-center gap-1.5 px-2">
            <span className="w-6 h-2 rounded-full bg-black"></span>
            <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
          </div>
          <button className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition text-zinc-600 text-xs">
            →
          </button>
        </div>

      </div>
    </div>
  )
}

export default HomeCategories