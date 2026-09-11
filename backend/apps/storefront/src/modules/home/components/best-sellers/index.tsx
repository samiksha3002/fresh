import LocalizedClientLink from "@modules/common/components/localized-client-link"

const skincareBestSellers = [
  {
    id: "1",
    title: "Hydrating Facial Cleanser",
    price: "$24.00",
    originalPrice: "$30.00",
    rating: "★★★★★",
    reviews: "(124)",
    badge: "ON SALE",
    badgeColor: "bg-red-500",
    description: "Gentle daily cleanser for glowing skin.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    title: "Vitamin C Brightening Serum",
    price: "$42.00",
    originalPrice: "",
    rating: "★★★★★",
    reviews: "(98)",
    badge: "NEW",
    badgeColor: "bg-emerald-600",
    description: "Boosts radiance & fades dark spots.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    title: "Niacinamide Oil-Control Cream",
    price: "$28.00",
    originalPrice: "$35.00",
    rating: "★★★★★",
    reviews: "(215)",
    badge: "ON SALE",
    badgeColor: "bg-red-500",
    description: "Balances sebum and hydrates deeply.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "4",
    title: "Soothing Rose Petal Toner",
    price: "$19.00",
    originalPrice: "",
    rating: "★★★★★",
    reviews: "(64)",
    badge: "",
    badgeColor: "",
    description: "Refreshes and tightens pores naturally.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600"
  }
]

const BestSellers = () => {
  return (
    <div className="py-16 bg-white border-b border-gray-100">
      <div className="content-container mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Best Sellers
          </h2>
          <LocalizedClientLink 
            href="/store" 
            className="text-sm font-semibold text-gray-900 underline hover:text-gray-600 transition"
          >
            View all products
          </LocalizedClientLink>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skincareBestSellers.map((product) => (
            <div 
              key={product.id}
              className="group flex flex-col bg-[#fcf8f5]/40 border border-gray-200/80 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Badge (ON SALE / NEW) */}
              {product.badge && (
                <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold text-white px-2.5 py-1 rounded-md tracking-wider ${product.badgeColor}`}>
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className="w-full h-64 rounded-xl overflow-hidden mb-5 bg-white flex items-center justify-center shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Price & Title */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                )}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-black">
                {product.title}
              </h3>

              {/* Ratings */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-amber-500 text-xs">{product.rating}</span>
                <span className="text-xs text-gray-400 font-medium">{product.reviews}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-6 line-clamp-1">
                {product.description}
              </p>

              {/* Buy Now Button */}
              <div className="mt-auto">
                <LocalizedClientLink 
                  href={`/products/${product.id}`}
                  className="w-full block text-center border border-gray-900 text-gray-900 font-medium py-3 rounded-full hover:bg-gray-900 hover:text-white transition duration-300 text-sm"
                >
                  Buy now
                </LocalizedClientLink>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BestSellers