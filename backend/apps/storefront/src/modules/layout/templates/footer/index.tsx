
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const footerLinkClass =
  "inline-flex items-center gap-2 transition-colors duration-200 hover:text-[var(--kt-primary)]"

const footerHeadingClass =
  "mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--kt-primary)]"

export default async function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full overflow-hidden border-t text-[var(--kt-primary)]"
      style={{
        backgroundColor: "var(--kt-cream, #faf9f6)",
        borderColor: "var(--kt-border, rgba(43,39,36,0.1))",
      }}
    >
      {/* NEWSLETTER */}
      <section
        className="border-b"
        style={{
          borderColor: "var(--kt-border, rgba(43,39,36,0.1))",
          backgroundColor: "var(--kt-white, #ffffff)",
        }}
      >
        <div className="content-container">
          <div className="grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
            <div className="max-w-2xl">
              <p
                className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                The Kovea Edit
              </p>

              <h2 className="max-w-xl text-[34px] font-normal leading-[1.15] tracking-[-0.045em] sm:text-[42px] lg:text-[50px]">
                Thoughtful skincare,
                <br />
                <span style={{ color: "var(--kt-secondary, #766c63)" }}>
                  delivered beautifully.
                </span>
              </h2>

              <p
                className="mt-4 max-w-md text-[12px] leading-6 sm:text-[13px]"
                style={{ color: "var(--kt-secondary, #766c63)" }}
              >
                Discover considered skincare, thoughtful routines and
                carefully selected products for your everyday ritual.
              </p>
            </div>

            <div className="w-full max-w-lg lg:ml-auto">
              <p
                className="mb-5 text-[12px] leading-6 sm:text-[13px]"
                style={{ color: "var(--kt-secondary, #766c63)" }}
              >
                Join the Kovea Touch community for new arrivals, product
                discoveries and brand updates.
              </p>

              <form
                action="#"
                onSubmit={undefined}
                className="group flex items-center gap-3 border-b pb-2 transition-colors duration-300 focus-within:border-[var(--kt-accent)]"
                style={{
                  borderColor: "var(--kt-border-strong, rgba(43,39,36,0.18))",
                }}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-1 bg-transparent py-3 text-[12px] outline-none placeholder:opacity-60 sm:text-[13px]"
                  style={{ color: "var(--kt-primary, #2b2724)" }}
                />

                <button
                  type="button"
                  className="group/button inline-flex shrink-0 items-center gap-2 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-65"
                  style={{ color: "var(--kt-primary, #2b2724)" }}
                  aria-label="Subscribe to the Kovea Touch newsletter"
                >
                  Subscribe
                  <span
                    aria-hidden="true"
                    className="text-sm transition-transform duration-300 group-hover/button:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </form>

              <p
                className="mt-3 text-[10px] leading-5"
                style={{ color: "var(--kt-secondary, #766c63)" }}
              >
                By subscribing, you agree to receive Kovea Touch updates.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <section className="content-container">
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 py-12 sm:gap-x-10 md:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_0.9fr] lg:gap-10 lg:py-14">
          {/* BRAND */}
          <div className="col-span-2 max-w-sm md:col-span-1">
            <LocalizedClientLink
              href="/"
              aria-label="Kovea Touch home"
              className="relative mb-5 block h-[60px] w-[160px]"
            >
              <Image
                src="/brownlogo.png"
                alt="Kovea Touch"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </LocalizedClientLink>

            <p
              className="max-w-[290px] text-[12px] leading-6"
              style={{ color: "var(--kt-secondary, #766c63)" }}
            >
              Authentic skincare and personal care, thoughtfully sourced
              and delivered to your doorstep.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className="h-px w-7"
                style={{ backgroundColor: "var(--kt-beige, #d8c9be)" }}
              />
              <span
                className="text-[9px] font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                Rooted in India
              </span>
            </div>
          </div>

          {/* DISCOVER */}
          <div>
            <h3 className={footerHeadingClass}>Discover</h3>
            <ul
              className="space-y-3.5 text-[12px]"
              style={{ color: "var(--kt-secondary, #766c63)" }}
            >
              <li>
                <LocalizedClientLink href="/store" className={footerLinkClass}>
                  Shop All
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store?concern=aging"
                  className={footerLinkClass}
                >
                  Aging
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store?concern=dark-spots"
                  className={footerLinkClass}
                >
                  Dark Spots
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store?concern=acne-texture"
                  className={footerLinkClass}
                >
                  Acne &amp; Texture
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store?concern=sensitive-skin"
                  className={footerLinkClass}
                >
                  Sensitive Skin
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* KOVEA TOUCH */}
          <div>
            <h3 className={footerHeadingClass}>Kovea Touch</h3>
            <ul
              className="space-y-3.5 text-[12px]"
              style={{ color: "var(--kt-secondary, #766c63)" }}
            >
              <li>
                <LocalizedClientLink href="/about" className={footerLinkClass}>
                  Our Story
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className={footerLinkClass}
                >
                  Contact Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/faq" className={footerLinkClass}>
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/track-order"
                  className={footerLinkClass}
                >
                  Track Your Order
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping-policy"
                  className={footerLinkClass}
                >
                  Shipping &amp; Returns
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* FOLLOW */}
          <div className="col-span-2 grid grid-cols-2 gap-7 sm:gap-10 md:col-span-1 md:block">
            <div>
              <h3 className={footerHeadingClass}>Follow</h3>
              <ul
                className="space-y-3.5 text-[12px]"
                style={{ color: "var(--kt-secondary, #766c63)" }}
              >
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${footerLinkClass}`}
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
                    rel="noopener noreferrer"
                    className={`group ${footerLinkClass}`}
                  >
                    Facebook
                    <span className="text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:mt-8">
              <p
                className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                We deliver to
              </p>
              <p
                className="text-[12px] leading-6"
                style={{ color: "var(--kt-secondary, #766c63)" }}
              >
                United States
                <br />
                United Kingdom
                <br />
                Australia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        className="border-y"
        style={{
          borderColor: "var(--kt-border, rgba(43,39,36,0.1))",
          backgroundColor: "var(--kt-white, #ffffff)",
        }}
      >
        <div className="content-container">
          <div className="grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0"
            style={{ borderColor: "var(--kt-border, rgba(43,39,36,0.1))" }}
          >
            <div className="flex items-center justify-center gap-3 py-5 md:justify-start md:pr-5">
              <span
                aria-hidden="true"
                className="text-lg"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                ◇
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] sm:text-[10px]">
                  Authentic Products
                </p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--kt-secondary, #766c63)" }}
                >
                  Carefully sourced
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 md:px-5">
              <span
                aria-hidden="true"
                className="text-lg"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                □
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] sm:text-[10px]">
                  Thoughtfully Packed
                </p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--kt-secondary, #766c63)" }}
                >
                  Prepared with care
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 md:justify-end md:pl-5">
              <span
                aria-hidden="true"
                className="text-lg"
                style={{ color: "var(--kt-accent, #96745c)" }}
              >
                ○
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] sm:text-[10px]">
                  Customer Support
                </p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--kt-secondary, #766c63)" }}
                >
                  Here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <section className="content-container">
        <div className="flex flex-col gap-5 py-6 text-[10px] sm:py-7 lg:flex-row lg:items-center lg:justify-between">
          <p style={{ color: "var(--kt-secondary, #766c63)" }}>
            © {year} Kovea Touch. All rights reserved.
          </p>

          <nav
            aria-label="Legal and policy links"
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
            style={{ color: "var(--kt-secondary, #766c63)" }}
          >
            <LocalizedClientLink
              href="/refund-policy"
              className="transition-colors hover:text-[var(--kt-primary)]"
            >
              Refund Policy
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/privacy-policy"
              className="transition-colors hover:text-[var(--kt-primary)]"
            >
              Privacy Policy
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/terms-of-service"
              className="transition-colors hover:text-[var(--kt-primary)]"
            >
              Terms
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/shipping-policy"
              className="transition-colors hover:text-[var(--kt-primary)]"
            >
              Shipping Policy
            </LocalizedClientLink>
          </nav>

          <div
            className="flex items-center gap-3"
            style={{ color: "var(--kt-secondary, #766c63)" }}
          >
            <span>USD $</span>
            <span
              className="h-3 w-px"
              style={{ backgroundColor: "var(--kt-border-strong, rgba(43,39,36,0.18))" }}
            />
            <span>Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* BRAND SIGNATURE */}
      <section
        className="overflow-hidden border-t"
        style={{ borderColor: "var(--kt-border, rgba(43,39,36,0.1))" }}
      >
        <div className="content-container">
          <p
            aria-hidden="true"
            className="select-none whitespace-nowrap py-5 text-center text-[clamp(40px,9vw,128px)] font-normal leading-none tracking-[-0.07em]"
            style={{ color: "rgba(43,39,36,0.055)" }}
          >
            KOVEA TOUCH
          </p>
        </div>
      </section>
    </footer>
  )
}
