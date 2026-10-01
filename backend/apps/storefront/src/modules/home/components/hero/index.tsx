
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const heroSlides = [
  {
    id: 1,
    eyebrow: "THE KOVEA TOUCH RITUAL",
    title: ["Pure.", "Radiant.", "Skincare."],
    description:
      "Elevate your daily ritual with thoughtfully selected skincare essentials designed to reveal healthy, luminous skin.",
    buttonText: "SHOP SKINCARE",
    buttonLink: "/store",
    before: "/images/hero/untitled design.png",
    after: "/images/hero/hero 1.jpeg",
    concern: "Dull, uneven tone",
    duration: "4 weeks",
  },
  {
    id: 2,
    eyebrow: "RESTORE YOUR GLOW",
    title: ["Defy.", "Restore.", "Protect."],
    description:
      "Discover carefully selected serums and moisturizers created to support your skin barrier and bring back its natural glow.",
    buttonText: "EXPLORE SERUMS",
    buttonLink: "/store?category=serums-retinoids",
    before: "/images/results/before-2.jpeg",
    after: "/images/results/after-2.jpeg",
    concern: "Dry, tired skin",
    duration: "6 weeks",
  },
  {
    id: 3,
    eyebrow: "EVERYDAY ESSENTIALS",
    title: ["Cleanse.", "Refresh.", "Revive."],
    description:
      "Gentle cleansing essentials that leave your skin feeling fresh, comfortable and beautifully renewed.",
    buttonText: "SHOP CLEANSERS",
    buttonLink: "/store?category=cleansers-body-washes",
    before: "/images/results/before-3.jpeg",
    after: "/images/results/after-3.jpeg",
    concern: "Clogged, congested pores",
    duration: "3 weeks",
  },
]

const SKEW = 7

const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden"
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)

  const draggingRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (draggingRef.current) return

      setIsChanging(true)

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsChanging(false)
      }, 350)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setPos(90)

    const timer = setTimeout(() => setPos(50), 600)

    return () => clearTimeout(timer)
  }, [currentSlide])

  const activeSlide = heroSlides[currentSlide]

  const goToSlide = (index: number) => {
    if (index === currentSlide) return

    setIsChanging(true)

    setTimeout(() => {
      setCurrentSlide(index)
      setIsChanging(false)
    }, 350)
  }

  const startDrag = () => {
    draggingRef.current = true
    setDragging(true)
    setHasDragged(true)
  }

  const endDrag = () => {
    draggingRef.current = false
    setDragging(false)
  }

  const ease = dragging
    ? ""
    : "transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)]"

  const topX = pos + SKEW
  const bottomX = pos - SKEW

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--kt-white,#ffffff)] text-[var(--kt-primary,#2b2724)]"
      style={{
        fontFamily: "var(--kt-font-body, var(--font-noto-sans), sans-serif)",
      }}
    >
      {/* HERO */}
      <div className="relative lg:h-[calc(100svh-150px)] lg:max-h-[860px] lg:min-h-[640px]">
        <div className="absolute inset-0 bg-[var(--kt-cream,#faf9f6)]" />

        {/* BEFORE / AFTER IMAGE PANEL */}
        <div className="relative h-[64vh] min-h-[460px] max-h-[640px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:max-h-none lg:min-h-0 lg:w-[54%]">
          <div
            className={`absolute inset-0 overflow-hidden bg-[var(--kt-sand,#f2ece5)] transition-opacity duration-700 ease-out ${
              isChanging ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* AFTER IMAGE */}
            <div className="absolute inset-0 bg-[var(--kt-sand,#f2ece5)]">
              <Image
                src={activeSlide.after}
                alt={`Skin after ${activeSlide.duration} of Kovea Touch`}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                onError={hideBroken}
                className="object-cover object-center"
              />
            </div>

            {/* BEFORE IMAGE */}
            <div
              className={`absolute inset-0 bg-[var(--kt-beige,#d8c9be)] ${ease}`}
              style={{
                clipPath: `polygon(0 0, ${topX}% 0, ${bottomX}% 100%, 0 100%)`,
              }}
            >
              <Image
                src={activeSlide.before}
                alt={`Skin before Kovea Touch, ${activeSlide.concern}`}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                onError={hideBroken}
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-[var(--kt-primary,#2b2724)]/10" />
            </div>

            {/* DIVIDER */}
            <div
              className={`pointer-events-none absolute inset-0 bg-[var(--kt-white,#ffffff)] ${ease}`}
              style={{
                clipPath: `polygon(${topX - 0.18}% 0, ${topX + 0.18}% 0, ${
                  bottomX + 0.18
                }% 100%, ${bottomX - 0.18}% 100%)`,
              }}
            />

            {/* DIVIDER HANDLE */}
            <div
              className={`pointer-events-none absolute top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--kt-border,#e9e4de)] bg-[var(--kt-white,#ffffff)] text-[15px] text-[var(--kt-primary,#2b2724)] shadow-[0_10px_30px_-8px_var(--kt-shadow,rgba(43,39,36,0.12))] ${
                dragging
                  ? ""
                  : "transition-[left] duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)]"
              }`}
              style={{ left: `${pos}%` }}
            >
              ⇆
            </div>

            {/* BEFORE LABEL */}
            <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-[var(--kt-border,#e9e4de)] bg-[var(--kt-white,#ffffff)]/95 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-[var(--kt-primary,#2b2724)] sm:left-8 sm:top-8">
              Before
            </span>

            {/* AFTER LABEL */}
            <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-[var(--kt-primary,#2b2724)]/85 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-[var(--kt-white,#ffffff)] sm:right-8 sm:top-8 lg:right-16">
              After
            </span>

            {/* RESULT CARD */}
            <div className="pointer-events-none absolute bottom-5 left-5 z-10 max-w-[230px] rounded-2xl border border-[var(--kt-border,#e9e4de)] bg-[var(--kt-white,#ffffff)]/95 px-5 py-4 shadow-[0_24px_50px_-20px_var(--kt-shadow,rgba(43,39,36,0.12))] sm:bottom-8 sm:left-8">
              <p className="text-[11px] tracking-[0.08em] text-[var(--kt-secondary,#766c63)]">
                Skin concern
              </p>

              <p className="mt-1 text-[18px] font-medium leading-snug text-[var(--kt-primary,#2b2724)]">
                {activeSlide.concern}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--kt-border-strong,rgba(43,39,36,0.18))]" />
                <span className="text-[11px] tracking-[0.08em] text-[var(--kt-secondary,#766c63)]">
                  {activeSlide.duration}
                </span>
              </div>
            </div>

            {/* DRAG HINT */}
            <div
              className={`pointer-events-none absolute bottom-5 right-5 z-10 flex items-center gap-3 rounded-full bg-[var(--kt-primary,#2b2724)]/85 px-4 py-2 text-[var(--kt-white,#ffffff)] transition-opacity duration-500 sm:bottom-8 sm:right-8 lg:right-16 ${
                hasDragged ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-[11px] tracking-[0.1em]">
                Drag to compare
              </span>
            </div>

            {/* TOUCH / MOUSE / KEYBOARD INPUT */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              onPointerDown={startDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onBlur={endDrag}
              aria-label="Compare skin before and after"
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[560px] max-w-[1500px] items-center px-6 py-16 sm:px-10 md:px-14 lg:absolute lg:inset-0 lg:min-h-0 lg:px-20 lg:py-10">
          <div
            key={activeSlide.id}
            className={`pointer-events-auto max-w-[560px] transition-all duration-700 ease-out ${
              isChanging
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--kt-accent,#96745c)]" />

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--kt-accent,#96745c)]">
                {activeSlide.eyebrow}
              </p>
            </div>

            <h1
              className="text-[56px] font-normal leading-[0.91] tracking-[-0.045em] text-[var(--kt-primary,#2b2724)] sm:text-[72px] md:text-[82px] lg:text-[clamp(64px,10vh,96px)]"
              style={{
                fontFamily:
                  "var(--kt-font-heading, var(--font-noto-sans), sans-serif)",
              }}
            >
              {activeSlide.title.map((line, index) => (
                <span
                  key={line}
                  className="block"
                  style={{
                    animation: `heroTextReveal 900ms ${
                      index * 90
                    }ms cubic-bezier(.22,.61,.36,1) both`,
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-8 max-w-[430px] text-[14px] leading-7 text-[var(--kt-secondary,#766c63)] sm:text-[15px]"
              style={{
                animation:
                  "heroDescriptionReveal 900ms 280ms cubic-bezier(.22,.61,.36,1) both",
              }}
            >
              {activeSlide.description}
            </p>

            <div
              className="mt-8"
              style={{
                animation:
                  "heroDescriptionReveal 900ms 400ms cubic-bezier(.22,.61,.36,1) both",
              }}
            >
              <LocalizedClientLink
                href={activeSlide.buttonLink}
                className="group inline-flex items-center gap-4 border-b border-[var(--kt-accent,#96745c)] pb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kt-primary,#2b2724)] transition-all duration-300 hover:border-[var(--kt-primary,#2b2724)]"
              >
                {activeSlide.buttonText}

                <span className="text-[15px] transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* SLIDE NAVIGATION */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 md:left-14 md:right-14 lg:bottom-8 lg:left-20 lg:right-auto lg:w-[38%]">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-medium text-[var(--kt-primary,#2b2724)]">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>

            <span className="text-[9px] tracking-[0.2em] text-[var(--kt-secondary,#766c63)]">
              /
            </span>

            <span className="text-[9px] tracking-[0.2em] text-[var(--kt-secondary,#766c63)]">
              {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className="group relative h-5 w-12"
              >
                <span
                  className={`absolute left-0 top-1/2 h-px -translate-y-1/2 transition-all duration-500 ${
                    currentSlide === index
                      ? "w-12 bg-[var(--kt-primary,#2b2724)]"
                      : "w-7 bg-[var(--kt-border-strong,rgba(43,39,36,0.18))] group-hover:w-10 group-hover:bg-[var(--kt-accent,#96745c)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BRAND STRIP */}
      <div className="border-t border-[var(--kt-border,rgba(43,39,36,0.1))] bg-[var(--kt-white,#ffffff)]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 sm:px-10 md:px-14 lg:px-20">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--kt-secondary,#766c63)]">
            Authentic Indian Personal Care
          </p>

          <p className="hidden text-[9px] uppercase tracking-[0.28em] text-[var(--kt-secondary,#766c63)] sm:block">
            Thoughtfully selected · Carefully delivered
          </p>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroTextReveal {
              0% { opacity: 0; transform: translateY(14px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            @keyframes heroDescriptionReveal {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            @media (prefers-reduced-motion: reduce) {
              *,
              *::before,
              *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `,
        }}
      />
    </section>
  )
}

export default Hero
