import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-[#fafafa] border-t border-gray-200 w-full font-sans mt-20">
      <div className="content-container flex flex-col w-full">
        
        {/* Top Section: Newsletter (Clinical/Premium touch) */}
        <div className="flex flex-col items-center justify-center py-20 text-center border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4 tracking-wide">
            Join the Kovea Touch Community
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-md">
            Subscribe for advanced skincare insights, exclusive access to clinical treatments, and targeted solutions for dark spots and aging.
          </p>
          <div className="flex w-full max-w-md gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full border-b border-gray-300 bg-transparent py-2 px-1 text-sm focus:outline-none focus:border-black transition duration-300"
            />
            <button className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Middle Section: Navigation & Links */}
        <div className="flex flex-col md:flex-row items-start justify-between py-16 gap-12 md:gap-8">
          
          {/* Brand Column with Logo Image */}
          <div className="md:w-1/3 flex flex-col items-start">
            <LocalizedClientLink href="/" className="mb-6 block">
              <Image 
                src="/logo kovea.jpeg" 
                alt="Kovea Touch Logo" 
                width={160} 
                height={60} 
                className="object-contain mix-blend-multiply"
              />
            </LocalizedClientLink>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs pr-4">
              Advanced dermocosmetics scientifically formulated to target aging, dark spots, and uneven tone for clinically proven, radiant skin.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 flex-1">
            
            {/* Dynamic Categories (Fetched from Medusa Admin) */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Shop
                </span>
                <ul className="grid grid-cols-1 gap-3">
                  {productCategories?.slice(0, 5).map((c) => {
                    if (c.parent_category) return null;
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-gray-500 hover:text-black transition-colors text-sm"
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Customer Care */}
            <div className="flex flex-col gap-y-4">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Support
              </span>
              <ul className="grid grid-cols-1 gap-3 text-gray-500 text-sm">
                <li><LocalizedClientLink href="/faq" className="hover:text-black transition-colors">FAQ</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/shipping" className="hover:text-black transition-colors">Shipping & Returns</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/contact" className="hover:text-black transition-colors">Contact Us</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/track-order" className="hover:text-black transition-colors">Track Order</LocalizedClientLink></li>
              </ul>
            </div>

            {/* Socials / Legal */}
            <div className="flex flex-col gap-y-4">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Connect
              </span>
              <ul className="grid grid-cols-1 gap-3 text-gray-500 text-sm">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                    Facebook
                  </a>
                </li>
                <li><LocalizedClientLink href="/terms" className="hover:text-black transition-colors">Terms of Service</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/privacy" className="hover:text-black transition-colors">Privacy Policy</LocalizedClientLink></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row w-full mb-8 pt-8 border-t border-gray-200 justify-between items-center text-gray-400 text-xs">
          <p>
            © {new Date().getFullYear()} Kovea Touch. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>INR ₹</span>
            <span>Secure Checkout</span>
          </div>
        </div>
        
      </div>
    </footer>
  )
}