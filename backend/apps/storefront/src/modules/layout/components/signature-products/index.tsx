"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function SignatureProducts() {
  return (
    <section className="w-full bg-white py-0">
      <div className="relative min-h-[360px] w-full overflow-hidden md:min-h-[460px] lg:min-h-[560px]">

        {/* SINGLE FULL-WIDTH IMAGE */}
        <LocalizedClientLink
          href="/store"
          className="group relative block min-h-[360px] w-full overflow-hidden md:min-h-[460px] lg:min-h-[560px]"
          aria-label="Shop signature skincare products"
        >
          <Image
            src="/full facew.png"
            alt="Kovea Touch signature skincare collection"
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </LocalizedClientLink>

        {/* CENTER CONTENT */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center px-4 pt-16 sm:pt-20 md:pt-[14%]">
          <div className="pointer-events-auto flex flex-col items-center text-center">

            <LocalizedClientLink
              href="/store"
              className="mt-5 inline-flex min-w-[190px] items-center justify-center gap-2 bg-[#2b2724] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#766c63]"
            >
              Shop Products
              <span aria-hidden="true">→</span>
            </LocalizedClientLink>

          </div>
        </div>

      </div>
    </section>
  )
}