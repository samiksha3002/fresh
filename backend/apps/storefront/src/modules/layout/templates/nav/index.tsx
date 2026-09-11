import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      
      {/* Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        ✨ Free shipping on all orders over $50 | Use code <span className="underline font-bold">GLOW20</span> for 20% off
      </div>

      <header className="relative h-16 px-6 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular">
          
          {/* Left: Mobile menu & Category Links */}
          <div className="flex-1 basis-0 h-full flex items-center gap-6">
            <div className="h-full flex items-center lg:hidden">
              <Suspense fallback={null}>
                <SideMenu regions={regions} />
              </Suspense>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
              <LocalizedClientLink href="/store" className="hover:text-black transition">
                Shop All
              </LocalizedClientLink>
              <LocalizedClientLink href="/store" className="hover:text-black transition">
                Skincare
              </LocalizedClientLink>
              <LocalizedClientLink href="/store" className="hover:text-black transition">
                Best Sellers
              </LocalizedClientLink>
            </div>
          </div>

          {/* Center: Brand Logo / Name */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase font-bold tracking-widest text-xl text-gray-900"
            >
              Kovea Touch
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Account & Cart */}
          <div className="flex items-center gap-x-6 flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6">
              <LocalizedClientLink
                href="/search"
                className="hover:text-ui-fg-base text-gray-700 font-medium"
                data-testid="nav-search-link"
              >
                Search
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                className="hover:text-ui-fg-base text-gray-700 font-medium"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="hover:text-ui-fg-base flex gap-2 text-gray-700 font-medium"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
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