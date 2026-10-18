"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

// TODO: replace with your real link (e.g. WhatsApp: https://wa.me/91XXXXXXXXXX or a Calendly/booking URL)
const DERMATOLOGIST_CONTACT_URL = "YOUR_DERMATOLOGIST_CONTACT_URL"

const RING_TEXT =
  "Connect with our dermatologist ✦ Have a skincare query? ✦ Connect with our dermatologist ✦ Have a skincare query? ✦ "

/* Pure CSS keyframes: no dependency on Tailwind arbitrary values, replays every time the section scrolls into view */
const CSS = `
.dc-root{--dc-ease:cubic-bezier(.22,1,.36,1)}
.dc-root .dc-rise{transform:translateY(110%)}
.dc-root.dc-in .dc-rise{animation:dc-rise 1.1s var(--dc-ease) var(--d,0ms) both}
@keyframes dc-rise{from{transform:translateY(110%)}to{transform:translateY(0)}}

.dc-root .dc-pop{opacity:0;transform:translateY(40px) scale(.9)}
.dc-root.dc-in .dc-pop{animation:dc-pop 1.2s var(--dc-ease) var(--d,0ms) both}
@keyframes dc-pop{from{opacity:0;transform:translateY(40px) scale(.9)}to{opacity:1;transform:none}}

.dc-root .dc-fade{opacity:0}
.dc-root.dc-in .dc-fade{animation:dc-fade 1.4s ease var(--d,0ms) both}
@keyframes dc-fade{from{opacity:0}to{opacity:1}}

.dc-spin{animation:dc-spin 30s linear infinite}
@keyframes dc-spin{to{transform:rotate(360deg)}}

.dc-marquee{animation:dc-marquee 45s linear infinite}
@keyframes dc-marquee{to{transform:translateX(-50%)}}

.dc-root.dc-in .dc-halo{animation:dc-halo 2.8s ease-out 1.8s infinite}
@keyframes dc-halo{
  0%{box-shadow:0 0 0 0 rgba(0,0,0,.28)}
  100%{box-shadow:0 0 0 34px rgba(0,0,0,0)}
}

@media (prefers-reduced-motion: reduce){
  .dc-root .dc-rise,.dc-root .dc-pop,.dc-root .dc-fade{transform:none!important;opacity:1!important;animation:none!important}
  .dc-spin,.dc-marquee,.dc-root .dc-halo{animation:none!important}
}
`

/** Text slides up from behind an invisible mask (bottom → top) */
function RevealLine({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span className="dc-rise block" style={{ "--d": `${delay}ms` } as CSSProperties}>
        {children}
      </span>
    </span>
  )
}

const outline: CSSProperties = {
  color: "transparent",
  WebkitTextStroke: "1.5px rgba(0,0,0,0.22)",
}

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center gap-8 sm:gap-12">
          <span>Have a skincare query?</span>
          <span className="text-black" style={{ WebkitTextStroke: "0" }}>
            ✦
          </span>
          <span>Connect with our dermatologist</span>
          <span className="text-black" style={{ WebkitTextStroke: "0" }}>
            ✦
          </span>
        </div>
      ))}
    </div>
  )
}

export default function DermatologistCTA() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`dc-root relative w-full overflow-hidden border-y border-black/10 bg-white pt-14 sm:pt-20 ${
        inView ? "dc-in" : ""
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 md:flex-row md:items-center md:justify-between md:gap-16">
        {/* Copy */}
        <div className="max-w-[680px]">
          <h2 className="text-[2.25rem] font-semibold leading-[1.03] tracking-[-0.045em] text-black sm:text-6xl lg:text-7xl">
            <RevealLine delay={0}>Have a skincare</RevealLine>
            <RevealLine delay={120}>query?</RevealLine>
          </h2>

          <p className="mt-5 max-w-[460px] text-base leading-7 text-black/60 sm:mt-7 sm:text-lg sm:leading-8">
            <RevealLine delay={320}>Connect with our dermatologist</RevealLine>
            <RevealLine delay={400}>for personalised guidance.</RevealLine>
          </p>
        </div>

        {/* CTA: button with rotating text ring */}
        <div className="group relative flex items-center justify-start md:h-[340px] md:w-[340px] md:shrink-0 md:justify-center">
          {/* rotating text ring (desktop) */}
          <div
            aria-hidden="true"
            className="dc-fade pointer-events-none absolute inset-0 hidden md:block"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            <svg viewBox="0 0 340 340" className="dc-spin h-full w-full">
              <defs>
                <path id="dc-circle" d="M170,170 m-145,0 a145,145 0 1,1 290,0 a145,145 0 1,1 -290,0" />
              </defs>
              <text
                fontSize="15"
                fontWeight="500"
                fill="rgba(0,0,0,0.55)"
                textLength="905"
                lengthAdjust="spacing"
              >
                <textPath href="#dc-circle">{RING_TEXT}</textPath>
              </text>
            </svg>
          </div>

          {/* thin inner ring */}
          <span
            aria-hidden="true"
            className="dc-fade pointer-events-none absolute inset-[62px] hidden rounded-full border border-black/15 transition-transform duration-700 ease-out group-hover:scale-[1.06] md:block"
            style={{ "--d": "700ms" } as CSSProperties}
          />

          {/* button */}
          <span className="dc-pop relative block" style={{ "--d": "450ms" } as CSSProperties}>
            <a
              href="/dermatologist-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="dc-halo inline-flex items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:scale-[1.06] hover:bg-[#1c1c1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:h-36 md:w-36 md:flex-col md:gap-1 md:p-0 md:text-base"
            >
              Connect Now
              <span
                aria-hidden="true"
                className="text-xl leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:text-3xl"
              >
                ↗
              </span>
            </a>
          </span>
        </div>
      </div>

      {/* Outlined marquee: fills the space, repeats the same message */}
      <div
        aria-hidden="true"
        className="dc-fade mt-12 select-none overflow-hidden pb-8 sm:mt-16 sm:pb-12"
        style={
          {
            "--d": "900ms",
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          } as CSSProperties
        }
      >
        <div
          className="dc-marquee flex w-max whitespace-nowrap text-[3.5rem] font-semibold leading-none tracking-[-0.04em] sm:text-[6rem] lg:text-[8rem]"
          style={outline}
        >
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  )
}