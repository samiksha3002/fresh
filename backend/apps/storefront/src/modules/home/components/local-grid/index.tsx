import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const LocalGrid = () => {
  const items = [
    {
      subtitle: "Fresh everyday",
      title: "Skincare Essentials",
      bg: "bg-[#f4efe6]", // Warm cream pastel
      imageText: "Essential Care",
      href: "/store",
    },
    {
      subtitle: "Just arrived!",
      title: "Glow Serums",
      bg: "bg-[#e3ede6]", // Soft sage green pastel
      imageText: "New Arrivals",
      href: "/store",
    },
    {
      subtitle: "Collection",
      title: "Pure Organic",
      bg: "bg-[#e4ebf2]", // Soft blue/grey pastel
      imageText: "Organic Range",
      href: "/store",
    },
  ]

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative ${item.bg} p-8 rounded-3xl flex flex-col items-center text-center justify-between min-h-[480px] overflow-hidden group transition-all duration-300 hover:shadow-lg`}
          >
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-zinc-600 font-medium">
                {item.subtitle}
              </span>
              <h3 className="text-3xl font-serif font-normal mt-2 text-zinc-900">
                {item.title}
              </h3>
            </div>

            {/* Image / Product Card Box */}
            <div className="w-full my-auto flex justify-center py-6">
              <div className="w-48 h-64 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-black/5 flex items-center justify-center text-zinc-400 text-sm font-medium transition-transform duration-500 group-hover:scale-105">
                {item.imageText}
              </div>
            </div>

            <LocalizedClientLink
              href={item.href}
              className="mt-6 bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all shadow-md"
            >
              Show more
            </LocalizedClientLink>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LocalGrid