
"use client"

import { useEffect, useRef, useState } from "react"

type Testimonial = {
  id: string
  customer_name: string
  customer_email?: string | null
  rating: number
  review: string
  avatar?: string | null
  product_id?: string | null
  source?: string
  status?: string
  is_featured?: boolean
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function Stars({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[13px] leading-none ${
            star <= safeRating
              ? "text-[var(--kt-accent)]"
              : "text-[var(--kt-beige)]"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function SectionHeading() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--kt-secondary)]">
          From Our Customers
        </p>

        <h2 className="mt-3 text-[32px] font-normal leading-[1.12] tracking-[-0.035em] text-[var(--kt-primary)] sm:text-[40px] md:text-[46px]">
          Loved by people{" "}
          <span className="text-[var(--kt-accent)]">
            who care about their skin.
          </span>
        </h2>
      </div>

      <p className="max-w-sm text-[12px] leading-[1.8] text-[var(--kt-secondary)] md:max-w-[280px] md:pb-1">
        Honest experiences from customers who have made Kovea Touch part of
        their everyday self-care ritual.
      </p>
    </div>
  )
}

function LoadingCards() {
  return (
    <div className="mt-9 flex gap-4 overflow-hidden">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="min-w-0 shrink-0 basis-full animate-pulse border border-[var(--kt-border)] bg-white p-5 sm:basis-[calc(50%-8px)] sm:p-6 lg:basis-[calc(33.333333%-10.667px)]"
        >
          <div className="h-3 w-20 bg-[var(--kt-sand)]" />

          <div className="mt-6 space-y-3">
            <div className="h-3 w-full bg-[var(--kt-sand)]" />
            <div className="h-3 w-[88%] bg-[var(--kt-sand)]" />
            <div className="h-3 w-[65%] bg-[var(--kt-sand)]" />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--kt-sand)]" />

            <div className="space-y-2">
              <div className="h-2.5 w-24 bg-[var(--kt-sand)]" />
              <div className="h-2 w-16 bg-[var(--kt-sand)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Load real testimonials from the existing API.
  useEffect(() => {
    let cancelled = false

    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Testimonials API failed: ${response.status}`)
        }

        const data = await response.json()

        const reviews: Testimonial[] = Array.isArray(data.testimonials)
          ? data.testimonials
          : []

        if (!cancelled) {
          setTestimonials(reviews.slice(0, 6))
        }
      } catch (error) {
        console.error("Testimonials could not be loaded:", error)

        if (!cancelled) {
          setTestimonials([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTestimonials()

    return () => {
      cancelled = true
    }
  }, [])

  // Show 1 card on mobile, 2 on tablet, and 3 on desktop.
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()

    window.addEventListener("resize", updateCardsPerView)

    return () => {
      window.removeEventListener("resize", updateCardsPerView)
    }
  }, [])

  // Measure the exact card width plus the gap.
  // This keeps every slide aligned at all screen sizes.
  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!viewport || !track) return

    const measure = () => {
      const firstCard = track.firstElementChild as HTMLElement | null

      if (!firstCard) return

      const cardWidth = firstCard.getBoundingClientRect().width
      const gap = Number.parseFloat(
        window.getComputedStyle(track).columnGap
      ) || 0

      setStep(cardWidth + gap)
    }

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(viewport)

    if (track.firstElementChild) {
      observer.observe(track.firstElementChild)
    }

    return () => observer.disconnect()
  }, [cardsPerView, testimonials.length])

  // Reset the carousel when the screen size changes.
  useEffect(() => {
    setTransitionEnabled(false)
    setCurrentIndex(0)

    const frame = window.requestAnimationFrame(() => {
      setTransitionEnabled(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [cardsPerView])

  const canSlide = testimonials.length > cardsPerView

  // Add copies of the first cards for a seamless looping transition.
  const displayedTestimonials: Testimonial[] = canSlide
    ? [
        ...testimonials,
        ...testimonials.slice(0, cardsPerView),
      ]
    : testimonials

  // Advance exactly ONE card every 4.5 seconds.
  useEffect(() => {
    if (!canSlide || step <= 0) return

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => index + 1)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [canSlide, step])

  // After sliding onto the duplicated cards, jump back to the
  // original first card without animation.
  function handleTransitionEnd(
    event: React.TransitionEvent<HTMLDivElement>
  ) {
    if (event.target !== event.currentTarget) return
    if (!canSlide || currentIndex < testimonials.length) return

    setTransitionEnabled(false)
    setCurrentIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    })
  }

  return (
    <section className="border-t border-[var(--kt-border)] bg-[var(--kt-cream)]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 md:py-20 lg:px-16">
        <SectionHeading />

        {loading && <LoadingCards />}

        {!loading && testimonials.length === 0 && (
          <div className="mt-8 border border-[var(--kt-border)] bg-white px-5 py-8 text-center sm:py-10">
            <p className="text-[12px] text-[var(--kt-secondary)]">
              Customer testimonials will appear here soon.
            </p>
          </div>
        )}

        {!loading && testimonials.length > 0 && (
          <div
            ref={viewportRef}
            className="relative mt-9 overflow-hidden"
          >
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex items-stretch gap-4"
              style={{
                transform: `translate3d(-${currentIndex * step}px, 0, 0)`,
                transition: transitionEnabled
                  ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
                willChange: "transform",
              }}
            >
              {displayedTestimonials.map((testimonial, index) => {
                const isClone = index >= testimonials.length

                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    aria-hidden={isClone ? true : undefined}
                    className="min-w-0 shrink-0 basis-full sm:basis-[calc(50%-8px)] lg:basis-[calc(33.333333%-10.667px)]"
                  >
                    <article className="group flex h-full min-h-[250px] flex-col justify-between border border-[var(--kt-border)] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--kt-border-strong)] hover:shadow-[0_12px_35px_var(--kt-shadow)] sm:p-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <Stars rating={Number(testimonial.rating)} />

                          <span
                            aria-hidden="true"
                            className="font-serif text-[34px] leading-[0.8] text-[var(--kt-beige)] transition-colors duration-500 group-hover:text-[var(--kt-accent)]"
                          >
                            “
                          </span>
                        </div>

                        <blockquote className="mt-5 break-words text-[13px] leading-[1.8] text-[var(--kt-primary)]">
                          {testimonial.review}
                        </blockquote>
                      </div>

                      <div className="mt-7 flex items-center gap-3 border-t border-[var(--kt-border)] pt-4">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt=""
                            loading="lazy"
                            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[var(--kt-border)]"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--kt-sand)] text-[10px] font-medium tracking-[0.06em] text-[var(--kt-primary)]">
                            {getInitials(testimonial.customer_name)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--kt-primary)]">
                            {testimonial.customer_name}
                          </p>

                          <p className="mt-1 text-[10px] text-[var(--kt-secondary)]">
                            Customer Review
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="ml-auto text-[13px] text-[var(--kt-accent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                        >
                          ✦
                        </span>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-9 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[var(--kt-border-strong)]" />

          <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[var(--kt-secondary)]">
            Kovea Touch
          </p>

          <div className="h-px w-8 bg-[var(--kt-border-strong)]" />
        </div>
      </div>
    </section>
  )
}
