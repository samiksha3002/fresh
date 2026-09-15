import { Suspense } from "react"
import Image from "next/image"
import { listRegions } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group font-sans">
      
      {/* Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        ✨ Free shipping on all orders over $50 | Use code <span className="underline font-bold">GLOW20</span> for 20% off
      </div>

      <header className="relative h-[80px] px-6 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm">
          
          {/* Left: Mobile menu & Category Links */}
          <div className="flex-1 basis-0 h-full flex items-center gap-6">
            <div className="h-full flex items-center lg:hidden">
              <Suspense fallback={null}>
                <SideMenu regions={regions} />
              </Suspense>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
              <LocalizedClientLink href="/" className="hover:text-black transition">
                Home
              </LocalizedClientLink>

              {/* Product Type Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                  Product Type 
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-56">
                  <div className="bg-white border border-gray-100 shadow-lg p-4 flex flex-col gap-3 text-gray-600 font-normal rounded-sm">
                    <LocalizedClientLink href="/store?category=all" className="hover:text-black hover:translate-x-1 transition-transform">All Skincare</LocalizedClientLink>
                    <LocalizedClientLink href="/store?category=cleansers" className="hover:text-black hover:translate-x-1 transition-transform">Cleansers & Body Washes</LocalizedClientLink>
                    <LocalizedClientLink href="/store?category=exfoliants" className="hover:text-black hover:translate-x-1 transition-transform">Exfoliants</LocalizedClientLink>
                    <LocalizedClientLink href="/store?category=moisturizers" className="hover:text-black hover:translate-x-1 transition-transform">Moisturizers</LocalizedClientLink>
                    <LocalizedClientLink href="/store?category=serums" className="hover:text-black hover:translate-x-1 transition-transform">Serums & Retinoids</LocalizedClientLink>
                    <LocalizedClientLink href="/store?category=sunscreens" className="hover:text-black hover:translate-x-1 transition-transform">Sunscreens</LocalizedClientLink>
                  </div>
                </div>
              </div>

              {/* Skin Concerns Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                  Skin Concerns
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-64">
                  <div className="bg-white border border-gray-100 shadow-lg p-4 flex flex-col gap-3 text-gray-600 font-normal rounded-sm">
                    <LocalizedClientLink href="/store?concern=acne" className="hover:text-black hover:translate-x-1 transition-transform">Acne / Texture</LocalizedClientLink>
                    <LocalizedClientLink href="/store?concern=aging" className="hover:text-black hover:translate-x-1 transition-transform">Aging</LocalizedClientLink>
                    <LocalizedClientLink href="/store?concern=pigmentation" className="hover:text-black hover:translate-x-1 transition-transform">Body Pigmentation</LocalizedClientLink>
                    <LocalizedClientLink href="/store?concern=oily" className="hover:text-black hover:translate-x-1 transition-transform">Oily Skin</LocalizedClientLink>
                    <LocalizedClientLink href="/store?concern=sensitive" className="hover:text-black hover:translate-x-1 transition-transform">Sensitive Skin / Barrier Repair</LocalizedClientLink>
                  </div>
                </div>
              </div>

              <LocalizedClientLink href="/about" className="hover:text-black transition">
                About Us
              </LocalizedClientLink>
            </div>
          </div>

          {/* Center: Brand Logo Image */}
          <div className="flex items-center justify-center h-full flex-1">
            <LocalizedClientLink href="/" className="flex items-center justify-center">
              {/* NOTE: Make sure to put your logo file in the 'public' folder and name it 'logo.png' */}
              <Image 
                src="/logo.png" 
                alt="Kovea Touch Logo" 
                width={150} 
                height={50} 
                className="object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Right: Search & Cart (And optionally Account) */}
          <div className="flex items-center gap-x-6 flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-4">
              <LocalizedClientLink
                href="/search"
                className="hover:text-black text-gray-700 transition"
                data-testid="nav-search-link"
              >
                {/* Search Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="hover:text-black flex gap-2 text-gray-700 transition"
                  data-testid="nav-cart-link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  <span className="font-medium">(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>

        </nav>
      </header>
    </div>
  )
}