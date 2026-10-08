  import React from "react"
  import Image from "next/image"
  import LocalizedClientLink from "@modules/common/components/localized-client-link"

  const LocalGrid = () => {
    const items = [
      {
        subtitle: "Hair concern",
        title: "Hair Loss",
        bg: "bg-[#f4efe6]",
        image: "/hairloss.jpg",
        href: "/store?category=hair-care",
      },
      {
        subtitle: "Hair concern",
        title: "Frizzy Hair",
        bg: "bg-[#f4efe6]",
        image: "/freezy.png",
        href: "/store?category=hair-care",
      },
      {
        subtitle: "Scalp concern",
        title: "Dandruff",
        bg: "bg-[#f4efe6]",
        image: "/dandruff.webp",
        href: "/store?category=hair-care",
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
              {/* TITLE */}
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-zinc-600 font-medium">
                  {item.subtitle}
                </span>

                <h3 className="text-3xl font-serif font-normal mt-2 text-zinc-900">
                  {item.title}
                </h3>
              </div>

              {/* IMAGE AREA */}
              <div className="w-full my-auto flex justify-center py-6">
                <div className="relative w-48 h-64 rounded-2xl overflow-hidden shadow-sm border border-black/5 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* BUTTON */}
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