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
    <div className="py-16 bg-white border-b border-gray-100">
      <div className="content-container mx-auto px-6 md:px-8">
        
        {/* Section Heading & Arrows like Shopify */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-700 font-bold">
              ←
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-700 font-bold">
              →
            </button>
          </div>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {skincareCategories.map((cat, index) => (
            <LocalizedClientLink 
              key={index} 
              href={cat.href}
              className="group flex flex-col items-center bg-[#fcf8f5]/60 border border-gray-200/70 rounded-2xl p-5 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-full h-36 md:h-40 rounded-xl overflow-hidden mb-4 bg-white flex items-center justify-center shadow-sm">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900 text-center group-hover:text-black">
                {cat.name}
              </span>
            </LocalizedClientLink>
          ))}
        </div>

      </div>
    </div>
  )
}

export default HomeCategories