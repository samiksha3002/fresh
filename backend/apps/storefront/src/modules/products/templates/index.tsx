import React from "react"
import Button from "@modules/common/components/button"

const LocalProductTemplate = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Image Gallery / Carousel Style */}
        <div className="flex flex-col gap-4 sticky top-24">
          <div className="relative bg-[#e9f2eb] rounded-3xl p-8 flex items-center justify-center min-h-[500px] overflow-hidden group border border-black/5">
            {/* Zoom icon top right */}
            <button className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
            </button>
            
            {/* Product Bag Image Placeholder */}
            <div className="w-64 h-96 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm flex items-center justify-center text-zinc-500 font-medium">
              Product Image
            </div>

            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-6 flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-semibold">&larr;</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
              </div>
              <span className="text-sm font-semibold">&rarr;</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details & Actions */}
        <div className="flex flex-col gap-6">
          
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-zinc-900">$4.99</span>
            <span className="text-lg text-zinc-400 line-through">$6.00</span>
          </div>

          {/* Title & Reviews */}
          <div>
            <h1 className="text-4xl font-serif font-normal text-zinc-900 tracking-tight">
              Keto Crunch
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <span className="text-xs text-zinc-500">(9)</span>
            </div>
          </div>

          {/* Short Description */}
          <div className="border-t border-zinc-100 pt-4">
            <h3 className="text-sm font-semibold text-zinc-900">Keto-friendly combination</h3>
            <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
              Keto-friendly combination of pecans, almonds, walnuts, pepitas and no sugar added dark chocolate. This protein-rich trail mix comes in a 10 oz resealable pouch, ensuring maximum freshness.
            </p>
          </div>

          {/* Allergens Icons */}
          <div className="border-t border-zinc-100 pt-4">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Allergens</span>
            <div className="flex flex-wrap gap-6 mt-3">
              <div className="flex items-center gap-2 text-xs text-zinc-800"><span className="p-1.5 bg-zinc-100 rounded-full">🌾</span> Corn</div>
              <div className="flex items-center gap-2 text-xs text-zinc-800"><span className="p-1.5 bg-zinc-100 rounded-full">🍞</span> Gluten</div>
              <div className="flex items-center gap-2 text-xs text-zinc-800"><span className="p-1.5 bg-zinc-100 rounded-full">🥜</span> Nuts</div>
              <div className="flex items-center gap-2 text-xs text-zinc-800"><span className="p-1.5 bg-zinc-100 rounded-full">🌰</span> Peanuts</div>
            </div>
          </div>

          {/* Nutriscore Card */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">Nutriscore</span>
              <span className="text-xs text-zinc-400 cursor-pointer">ⓘ</span>
            </div>
            {/* Color Bar */}
            <div className="relative w-full h-3 rounded-full overflow-hidden flex">
              <div className="w-1/5 bg-emerald-600"></div>
              <div className="w-1/5 bg-emerald-400"></div>
              <div className="w-1/5 bg-amber-400"></div>
              <div className="w-1/5 bg-orange-500"></div>
              <div className="w-1/5 bg-red-600"></div>
            </div>
            {/* Pointer for C */}
            <div className="flex justify-center mt-1 text-xs font-bold">
              <span className="text-black transform -translate-x-3">▼</span>
            </div>
            <div className="flex justify-between px-2 text-xs font-semibold text-zinc-600">
              <span>A</span><span>B</span><span className="text-black underline">C</span><span>D</span><span>E</span>
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="text-sm font-semibold text-zinc-900 block mb-2">Style</label>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-full border-2 border-black text-sm font-medium bg-white text-black shadow-sm">
                Student Mix
              </button>
              <button className="px-5 py-2.5 rounded-full border border-zinc-300 text-sm font-medium bg-white text-zinc-600 hover:border-zinc-400 transition">
                Smart Mix
              </button>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
            {/* Quantity Selector */}
            <div className="flex items-center border border-zinc-300 rounded-full px-4 py-3 bg-white">
              <button className="text-zinc-500 hover:text-black px-2">-</button>
              <span className="mx-4 text-sm font-medium">1</span>
              <button className="text-zinc-500 hover:text-black px-2">+</button>
            </div>

            {/* Add to Cart Button */}
            <button className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-zinc-800 transition shadow-md">
              Add to cart
            </button>
          </div>

          {/* Buy it now button */}
          <button className="w-full bg-white border border-zinc-300 text-zinc-900 py-4 rounded-full font-medium hover:bg-zinc-50 transition">
            Buy it now
          </button>

        </div>
      </div>
    </div>
  )
}

export default LocalProductTemplate