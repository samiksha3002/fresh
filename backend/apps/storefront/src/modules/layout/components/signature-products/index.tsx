
"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function SignatureProducts() {
  return (
    <section className="w-full bg-white py-0">
      <div className="relative grid min-h-[360px] grid-cols-1 overflow-hidden md:min-h-[460px] md:grid-cols-2 lg:min-h-[560px]">

        {/* LEFT: SKINCARE PRODUCT IMAGE */}
        <LocalizedClientLink
          href="/store"
          className="group relative min-h-[320px] overflow-hidden bg-[#f4efe6] md:min-h-[460px] lg:min-h-[560px]"
          aria-label="Shop signature skincare products"
        >
          <Image
            src="/images/signature-products-left.jpg"
            alt="Kovea Touch signature skincare products"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </LocalizedClientLink>

        {/* RIGHT: SKINCARE LIFESTYLE IMAGE */}
        <LocalizedClientLink
          href="/store"
          className="group relative min-h-[320px] overflow-hidden bg-[#e8d5c9] md:min-h-[460px] lg:min-h-[560px]"
          aria-label="Explore skincare essentials"
        >
          <Image
            src="/images/signature-products-right.jpg"
            alt="Skincare soap and body care ritual"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </LocalizedClientLink>

        {/* CENTER CONTENT */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center px-4 pt-16 sm:pt-20 md:items-start md:pt-[14%]">
          <div className="pointer-events-auto flex flex-col items-center text-center">
            <h2 className="text-2xl font-normal uppercase tracking-[0.02em] text-[#2b2724] sm:text-3xl md:text-4xl lg:text-[40px]">
              Signature Products
            </h2>

            <LocalizedClientLink
              href="/store"
              className="mt-5 inline-flex min-w-[190px] items-center justify-center gap-2 bg-[#2b2724] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#766c63]"
            >
              Shop Signature Products
              <span aria-hidden="true">→</span>
            </LocalizedClientLink>
          </div>
        </div>

      </div>
    </section>
  )
}
