import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const year = new Date().getFullYear()

  return (
   <footer className="w-full border-t border-[#25231f]/10 bg-[#f7f5f0] text-[#25231f]">
      
      {/* ======================================================
          NEWSLETTER
      ====================================================== */}
      <div className="border-b border-[#25231f]/10">
        <div className="content-container">
          <div className="grid min-h-[390px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:py-24">

            {/* LEFT */}
            <div className="max-w-2xl">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.32em] text-[#817b70]">
                The Kovea Edit
              </p>

              <h2 className="font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.035em] text-[#25231f] sm:text-[52px] lg:text-[60px]">
                Thoughtful skincare,
                <br />

                <span className="italic text-[#777168]">
                  delivered beautifully.
                </span>
              </h2>
            </div>

            {/* RIGHT */}
            <div className="max-w-lg lg:ml-auto">
              <p className="mb-8 text-[13px] leading-6 text-[#777168]">
                Join our community for considered skincare guidance,
                new arrivals, product discoveries and exclusive
                Kovea Touch updates.
              </p>

              <div className="flex items-end border-b border-[#25231f]/40 pb-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent py-3 pr-5 text-[13px] text-[#25231f] outline-none placeholder:text-[#9d978d]"
                />

                <button
                  type="button"
                  className="group flex items-center gap-3 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#25231f]"
                >
                  Subscribe

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              <p className="mt-4 text-[10px] leading-5 text-[#aaa49a]">
                By subscribing, you agree to receive Kovea Touch
                updates. You can unsubscribe at any time.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="content-container">
        <div className="grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 lg:py-20">

          {/* ==================================================
              BRAND
          ================================================== */}
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="relative mb-7 block h-[72px] w-[180px]"
            >
              <Image
                src="/kovea logo.png"
                alt="Kovea Touch"
                fill
                sizes="180px"
                className="object-contain object-left mix-blend-multiply"
              />
            </LocalizedClientLink>

            <p className="max-w-[320px] text-[13px] leading-6 text-[#777168]">
              Authentic skincare and personal care, thoughtfully
              sourced and delivered to your doorstep.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-7 bg-[#25231f]/20" />

              <span className="text-[9px] uppercase tracking-[0.28em] text-[#918b81]">
                Rooted in India
              </span>
            </div>
          </div>

          {/* ==================================================
              DISCOVER
          ================================================== */}
          <div>
            <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-[#25231f]">
              Discover
            </h3>

            <ul className="space-y-4 text-[12px] text-[#777168]">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Shop All
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store?concern=aging"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Aging
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store?concern=dark-spots"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Dark Spots
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store?concern=acne-texture"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Acne & Texture
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store?concern=sensitive-skin"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Sensitive Skin
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* ==================================================
              KOVEA TOUCH
          ================================================== */}
          <div>
            <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-[#25231f]">
              Kovea Touch
            </h3>

            <ul className="space-y-4 text-[12px] text-[#777168]">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Our Story
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Contact Us
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  FAQ
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/track-order"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Track Your Order
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/shipping-policy"
                  className="transition-colors duration-200 hover:text-[#25231f]"
                >
                  Shipping & Returns
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* ==================================================
              FOLLOW
          ================================================== */}
          <div>
            <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-[#25231f]">
              Follow
            </h3>

            <ul className="space-y-4 text-[12px] text-[#777168]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#25231f]"
                >
                  Instagram

                  <span className="text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#25231f]"
                >
                  Facebook

                  <span className="text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-10">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#aaa49a]">
                We deliver to
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#777168]">
                United States
                <br />
                United Kingdom
                <br />
                Australia
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================
          TRUST STRIP
      ====================================================== */}
      <div className="border-y border-[#25231f]/10">
        <div className="content-container">
          <div className="grid divide-y divide-[#25231f]/10 md:grid-cols-3 md:divide-x md:divide-y-0">

            <div className="flex items-center justify-center gap-4 py-7 md:justify-start md:pr-8">
              <span className="text-[15px]">◇</span>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em]">
                  Authentic Products
                </p>

                <p className="mt-1 text-[10px] text-[#918b81]">
                  Carefully sourced & vetted
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-7 md:px-8">
              <span className="text-[15px]">□</span>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em]">
                  Thoughtfully Packed
                </p>

                <p className="mt-1 text-[10px] text-[#918b81]">
                  Prepared with care
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-7 md:justify-end md:pl-8">
              <span className="text-[15px]">○</span>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em]">
                  Real Support
                </p>

                <p className="mt-1 text-[10px] text-[#918b81]">
                  Real people, real answers
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="content-container">
        <div className="flex flex-col gap-6 py-8 text-[10px] text-[#918b81] lg:flex-row lg:items-center lg:justify-between">

          {/* COPYRIGHT */}
          <div>
            © {year} Kovea Touch. All rights reserved.
          </div>

          {/* POLICIES */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LocalizedClientLink
              href="/refund-policy"
              className="transition-colors hover:text-[#25231f]"
            >
              Refund Policy
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/privacy-policy"
              className="transition-colors hover:text-[#25231f]"
            >
              Privacy Policy
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/terms-of-service"
              className="transition-colors hover:text-[#25231f]"
            >
              Terms
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/shipping-policy"
              className="transition-colors hover:text-[#25231f]"
            >
              Shipping Policy
            </LocalizedClientLink>
          </div>

          {/* CURRENCY */}
          <div className="flex items-center gap-3">
            <span>USD $</span>

            <span className="h-3 w-px bg-[#25231f]/15" />

            <span>Secure Checkout</span>
          </div>

        </div>
      </div>

      {/* ======================================================
          LARGE BRAND SIGNATURE
      ====================================================== */}
      <div className="overflow-hidden border-t border-[#25231f]/10">
        <div className="content-container">
          <div className="select-none py-7 text-center font-serif text-[clamp(54px,9vw,145px)] font-normal leading-none tracking-[-0.055em] text-[#25231f]/[0.055]">
            KOVEA TOUCH
          </div>
        </div>
      </div>

    </footer>
  )
}