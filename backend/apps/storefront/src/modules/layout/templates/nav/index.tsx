import { Suspense } from "react"
import Image from "next/image"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import AnnouncementBar from "@modules/layout/announcement-bar"
import ScrollNav from "./scroll-nav"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <ScrollNav>
      {/* ====================================================== */}
      {/* TOP ANNOUNCEMENT BAR */}
      {/* ====================================================== */}

      <AnnouncementBar />

      <header className="relative h-[80px] px-6 mx-auto duration-200 theme-bg border-b theme-border">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm theme-text">

          {/* ====================================================== */}
          {/* LEFT: MOBILE MENU + DESKTOP NAVIGATION */}
          {/* ====================================================== */}

          <div className="flex-1 basis-0 h-full flex items-center gap-6">

            {/* Mobile Menu */}
            <div className="h-full flex items-center lg:hidden">
              <Suspense fallback={null}>
                <SideMenu regions={regions} />
              </Suspense>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 theme-text-muted font-medium">

              {/* Home */}
              <LocalizedClientLink
                href="/"
                className="hover:theme-text transition-colors"
              >
                Home
              </LocalizedClientLink>

              {/* ================================================== */}
              {/* PRODUCT TYPE DROPDOWN */}
              {/* ================================================== */}

              <div className="relative group h-full flex items-center">

                <button className="flex items-center gap-1 hover:theme-text transition-colors cursor-pointer">
                  Product Type

                  <svg
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute top-full left-0 pt-0 hidden group-hover:block w-64">

                  <div className="theme-bg border theme-border-light shadow-xl p-4 flex flex-col gap-3 theme-text-muted font-normal rounded-b-md max-h-[70vh] overflow-y-auto">

                    <LocalizedClientLink
                      href="/store?category=all-skincare"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      All Skincare
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=azelaic-acid"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Azelaic Acid
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=brighteners"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Brighteners
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=cleansers-body-washes"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Cleansers & Body Washes
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=exfoliants"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Exfoliants
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=hair-care"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Hair Care
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=hydroquinone-break-products"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Hydroquinone Break Products
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=moisturizers"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Moisturizers
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=serums-retinoids"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Serums & Retinoids
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=sunscreens"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Sunscreens
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=toners-essense-ampoule"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Toners/Essense/Ampoule
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?category=vitamin-c-antioxidant"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Vitamin C / Antioxidant
                    </LocalizedClientLink>

                  </div>
                </div>
              </div>

              {/* ================================================== */}
              {/* SKIN CONCERNS DROPDOWN */}
              {/* ================================================== */}

              <div className="relative group h-full flex items-center">

                <button className="flex items-center gap-1 hover:theme-text transition-colors cursor-pointer">
                  Skin Concerns

                  <svg
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute top-full left-0 pt-0 hidden group-hover:block w-72">

                  <div className="theme-bg border theme-border-light shadow-xl p-4 flex flex-col gap-3 theme-text-muted font-normal rounded-b-md max-h-[70vh] overflow-y-auto">

                    <LocalizedClientLink
                      href="/store?concern=acne-texture"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Acne/Texture
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=aging"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Aging
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=body-pigmentation"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Body Pigmentation
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=dark-knees-elbows"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Dark Knees & Elbows
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=dark-underarms-dark-neck"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Dark Underarms & Dark Neck
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=hair-loss-care"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Hair Loss/Care
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=kp-strawberry-legs"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      KP & Strawberry Legs
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=large-pores-texture"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Large Pores/Texture
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=lip-eye-care"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Lip & Eye Care
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=mild-moderate-pigmentation"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Mild - Moderate Pigmentation
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=oily-skin"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Oily Skin
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=pregnancy-safe"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Pregnancy Safe
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=scar-treatment"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Scar Treatment
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=sensitive-skin-barrier-repair-dry-skin"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Sensitive Skin/Barrier Repair/Dry Skin
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=skintags-razor-bumps"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Skintags/Razor Bumps
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=stubborn-pigmentation"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Stubborn Pigmentation
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/store?concern=tinea-versicolor-dandruff-hibiclens"
                      className="hover:theme-text hover:translate-x-1 transition-transform"
                    >
                      Tinea Versicolor/Dandruff/Hibiclens
                    </LocalizedClientLink>

                  </div>
                </div>
              </div>

              {/* About Us */}
              <LocalizedClientLink
                href="/about"
                className="hover:theme-text transition-colors"
              >
                About Us
              </LocalizedClientLink>

            </div>
          </div>

          {/* ====================================================== */}
          {/* CENTER: KOVEA TOUCH LOGO */}
          {/* ====================================================== */}

          <div className="flex items-center justify-center h-full flex-1">

            <LocalizedClientLink
              href="/"
              className="flex items-center justify-center w-full h-full relative"
            >
              <Image
                src="/logo kovea.jpeg"
                alt="Kovea Touch Logo"
                width={160}
                height={60}
                className="object-contain mix-blend-multiply"
                priority
              />
            </LocalizedClientLink>

          </div>

          {/* ====================================================== */}
          {/* RIGHT: SEARCH + ACCOUNT + CART */}
          {/* ====================================================== */}

          <div className="flex items-center gap-x-6 flex-1 basis-0 justify-end">

            {/* Search */}
            <div className="hidden small:flex items-center gap-x-4">

              <LocalizedClientLink
                href="/search"
                className="hover:theme-text theme-text-muted transition-colors"
                data-testid="nav-search-link"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </LocalizedClientLink>

            </div>

            {/* ================================================== */}
            {/* ACCOUNT */}
            {/* ================================================== */}

            {customer ? (

              /* LOGGED IN */
              <LocalizedClientLink
                href="/account"
                className="hidden small:flex items-center gap-2 theme-text-muted hover:theme-text transition-colors"
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  />
                </svg>

                <span className="font-medium">
                  {customer.first_name || customer.email}
                </span>

              </LocalizedClientLink>

            ) : (

              /* LOGGED OUT */
              <div className="hidden small:flex items-center gap-3 theme-text-muted">

                <LocalizedClientLink
                  href="/account"
                  className="flex items-center gap-2 hover:theme-text transition-colors"
                >

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    />
                  </svg>

                  <span className="font-medium">
                    Sign In
                  </span>

                </LocalizedClientLink>

                <span className="theme-text-subtle">
                  |
                </span>

                <LocalizedClientLink
                  href="/account?view=register"
                  className="font-medium hover:theme-text transition-colors"
                >
                  Sign Up
                </LocalizedClientLink>

              </div>

            )}

            {/* ================================================== */}
            {/* CART */}
            {/* ================================================== */}

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2 theme-text-muted hover:theme-text transition-colors"
                  data-testid="nav-cart-link"
                >

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>

                  <span className="font-medium">
                    (0)
                  </span>

                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

          </div>

        </nav>
      </header>
    </ScrollNav>
  )
}