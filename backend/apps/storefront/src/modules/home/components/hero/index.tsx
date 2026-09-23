"use client"

import { useEffect, useState } from "react"
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
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=1800",
  },
  {
    id: 2,
    eyebrow: "RESTORE YOUR GLOW",
    title: ["Defy.", "Restore.", "Protect."],
    description:
      "Discover carefully selected serums and moisturizers created to support your skin barrier and bring back its natural glow.",
    buttonText: "EXPLORE SERUMS",
    buttonLink: "/store?category=serums-retinoids",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=1800",
  },
  {
    id: 3,
    eyebrow: "EVERYDAY ESSENTIALS",
    title: ["Cleanse.", "Refresh.", "Revive."],
    description:
      "Gentle cleansing essentials that leave your skin feeling fresh, comfortable and beautifully renewed.",
    buttonText: "SHOP CLEANSERS",
    buttonLink: "/store?category=cleansers-body-washes",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=85&w=1800",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true)

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsChanging(false)
      }, 350)
    }, 5500)

    return () => clearInterval(timer)
  }, [])

  const activeSlide = heroSlides[currentSlide]

  const goToSlide = (index: number) => {
    if (index === currentSlide) return

    setIsChanging(true)

    setTimeout(() => {
      setCurrentSlide(index)
      setIsChanging(false)
    }, 350)
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* =========================================================
          HERO
      ========================================================== */}

      <div className="relative min-h-[720px] md:min-h-[760px] lg:min-h-[820px]">

        {/* Very subtle warm background */}
        <div className="absolute inset-0 bg-[#faf9f6]" />

        {/* =====================================================
            DESKTOP IMAGE
        ====================================================== */}

        <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">

          {/* Image frame */}
          <div className="absolute inset-y-8 right-8 left-0 overflow-hidden">

            {/* Current image */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isChanging ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title.join(" ")}
                fill
                priority
                sizes="54vw"
                className="object-cover object-center animate-[heroImageZoom_8s_ease-out_forwards]"
              />
            </div>

            {/* Soft inner light */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#faf9f6]/15 via-transparent to-white/5" />
          </div>

          {/* Small editorial label */}
          <div className="absolute bottom-14 left-8 z-10">
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/80">
              Kovea Touch
            </span>
          </div>

        </div>

        {/* =====================================================
            MOBILE IMAGE
        ====================================================== */}

        <div className="relative block h-[58vh] min-h-[430px] max-h-[620px] w-full lg:hidden">

          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isChanging ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title.join(" ")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center animate-[heroImageZoom_8s_ease-out_forwards]"
            />
          </div>

          {/* subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf9f6] to-transparent" />
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1500px] items-center px-6 py-16 sm:px-10 md:min-h-[760px] md:px-14 lg:min-h-[820px] lg:px-20">

          <div
            key={activeSlide.id}
            className={`max-w-[560px] transition-all duration-700 ease-out ${
              isChanging
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >

            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-8 bg-[#25231f]/40" />

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736b]">
                {activeSlide.eyebrow}
              </p>

            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-[56px] font-normal leading-[0.91] tracking-[-0.045em] text-[#25231f] sm:text-[72px] md:text-[82px] lg:text-[96px]">

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

            {/* Description */}
            <p
              className="mt-9 max-w-[430px] text-[14px] leading-7 text-[#77736b] sm:text-[15px]"
              style={{
                animation:
                  "heroDescriptionReveal 900ms 280ms cubic-bezier(.22,.61,.36,1) both",
              }}
            >
              {activeSlide.description}
            </p>

            {/* CTA */}
            <div
              className="mt-9"
              style={{
                animation:
                  "heroDescriptionReveal 900ms 400ms cubic-bezier(.22,.61,.36,1) both",
              }}
            >
              <LocalizedClientLink
                href={activeSlide.buttonLink}
                className="group inline-flex items-center gap-4 border-b border-[#25231f]/40 pb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#25231f] transition-all duration-300 hover:border-[#25231f]"
              >
                {activeSlide.buttonText}

                <span className="text-[15px] transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </LocalizedClientLink>
            </div>

          </div>
        </div>

        {/* =====================================================
            SLIDE NAVIGATION
        ====================================================== */}

        <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 md:left-14 md:right-14 lg:bottom-12 lg:left-20 lg:right-20">

          {/* Slide number */}
          <div className="flex items-center gap-3">

            <span className="font-serif text-[18px] text-[#25231f]">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>

            <span className="text-[9px] tracking-[0.2em] text-[#aaa49a]">
              /
            </span>

            <span className="text-[9px] tracking-[0.2em] text-[#aaa49a]">
              {String(heroSlides.length).padStart(2, "0")}
            </span>

          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">

            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="group relative h-5 w-12"
              >
                <span
                  className={`absolute left-0 top-1/2 h-px -translate-y-1/2 transition-all duration-500 ${
                    currentSlide === index
                      ? "w-12 bg-[#25231f]"
                      : "w-7 bg-[#25231f]/20 group-hover:w-10 group-hover:bg-[#25231f]/50"
                  }`}
                />
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM BRAND STRIP
      ========================================================== */}

      <div className="border-t border-[#25231f]/8 bg-white">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 sm:px-10 md:px-14 lg:px-20">

          <p className="text-[9px] uppercase tracking-[0.28em] text-[#8a857c]">
            Authentic Indian Personal Care
          </p>

          <p className="hidden text-[9px] uppercase tracking-[0.28em] text-[#aaa49a] sm:block">
            Thoughtfully selected · Carefully delivered
          </p>

        </div>

      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroTextReveal {
              0% {
                opacity: 0;
                transform: translateY(14px);
              }

              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes heroDescriptionReveal {
              0% {
                opacity: 0;
                transform: translateY(10px);
              }

              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes heroImageZoom {
              0% {
                transform: scale(1.025);
              }

              100% {
                transform: scale(1);
              }
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