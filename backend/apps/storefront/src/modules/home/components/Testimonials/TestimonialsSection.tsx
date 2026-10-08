"use client"

import { useEffect, useState } from "react"

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
          className="
            min-w-full
            border
            border-[var(--kt-border)]
            bg-white
            p-5
            animate-pulse
            sm:min-w-[calc(50%-8px)]
            lg:min-w-[calc(33.333%-11px)]
            sm:p-6
          "
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
  const [currentIndex, setCurrentIndex] = useState(0)

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

        if (cancelled) return

        setTestimonials(reviews.slice(0, 6))
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

  /*
   * AUTOMATIC SLIDER
   *
   * Changes the active card every 5 seconds.
   */
  useEffect(() => {
    if (testimonials.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="border-t border-[var(--kt-border)] bg-[var(--kt-cream)]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 md:py-20 lg:px-16">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <SectionHeading />

        {/* =========================================================
            LOADING
        ========================================================= */}

        {loading && <LoadingCards />}

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}

        {!loading && testimonials.length === 0 && (
          <div className="mt-8 border border-[var(--kt-border)] bg-white px-5 py-8 text-center sm:py-10">
            <p className="text-[12px] text-[var(--kt-secondary)]">
              Customer testimonials will appear here soon.
            </p>
          </div>
        )}

        {/* =========================================================
            TESTIMONIAL SLIDER
        ========================================================= */}

        {!loading && testimonials.length > 0 && (
          <div className="relative mt-9 overflow-hidden">

            <div
              className="
                flex
                transition-transform
                duration-1000
                ease-in-out
              "
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / Math.min(testimonials.length, 3))
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="
                    min-w-full
                    shrink-0
                    px-0
                    sm:min-w-1/2
                    lg:min-w-1/3
                  "
                >
                  <article
                    className="
                      group
                      mx-2
                      flex
                      min-h-[250px]
                      flex-col
                      justify-between
                      border
                      border-[var(--kt-border)]
                      bg-white
                      p-5
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[var(--kt-border-strong)]
                      hover:shadow-[0_10px_30px_var(--kt-shadow)]
                      sm:p-6
                    "
                  >

                    {/* TOP */}
                    <div>

                      <div className="flex items-center justify-between">

                        <Stars
                          rating={Number(testimonial.rating)}
                        />

                        <span
                          aria-hidden="true"
                          className="
                            font-serif
                            text-[34px]
                            leading-[0.8]
                            text-[var(--kt-beige)]
                            transition-colors
                            duration-300
                            group-hover:text-[var(--kt-accent)]
                          "
                        >
                          “
                        </span>

                      </div>

                      {/* REVIEW */}

                      <blockquote
                        className="
                          mt-5
                          text-[13px]
                          leading-[1.8]
                          text-[var(--kt-primary)]
                        "
                      >
                        {testimonial.review}
                      </blockquote>

                    </div>

                    {/* CUSTOMER */}

                    <div
                      className="
                        mt-7
                        flex
                        items-center
                        gap-3
                        border-t
                        border-[var(--kt-border)]
                        pt-4
                      "
                    >

                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt=""
                          loading="lazy"
                          className="
                            h-9
                            w-9
                            shrink-0
                            rounded-full
                            object-cover
                            ring-1
                            ring-[var(--kt-border)]
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[var(--kt-sand)]
                            text-[10px]
                            font-medium
                            tracking-[0.06em]
                            text-[var(--kt-primary)]
                          "
                        >
                          {getInitials(testimonial.customer_name)}
                        </div>
                      )}

                      <div className="min-w-0">

                        <p
                          className="
                            truncate
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.1em]
                            text-[var(--kt-primary)]
                          "
                        >
                          {testimonial.customer_name}
                        </p>

                        <p className="mt-1 text-[10px] text-[var(--kt-secondary)]">
                          Customer Review
                        </p>

                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          ml-auto
                          text-[13px]
                          text-[var(--kt-accent)]
                          opacity-60
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      >
                        ✦
                      </span>

                    </div>

                  </article>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =========================================================
            FOOTER DETAIL
        ========================================================= */}

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