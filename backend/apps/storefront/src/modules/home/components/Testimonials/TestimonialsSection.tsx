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
  const safeRating = Math.max(
    0,
    Math.min(5, Number(rating) || 0)
  )

  return (
    <div
      className="flex items-center gap-[3px]"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= safeRating
              ? "text-[#9b8b68] text-[15px]"
              : "text-[#d8d3ca] text-[15px]"
          }
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(
            `Testimonials API failed: ${response.status}`
          )
        }

        const data = await response.json()

        console.log(
          "TESTIMONIAL API RESPONSE:",
          data
        )

        // Your API returns:
        // { testimonials: [...] }

        const reviews: Testimonial[] = Array.isArray(
          data.testimonials
        )
          ? data.testimonials
          : []

        if (cancelled) return

        // Backend already returns approved testimonials.
        // We simply display the first 6.
        setTestimonials(reviews.slice(0, 6))
      } catch (error) {
        console.error(
          "Testimonials could not be loaded:",
          error
        )

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

  // Loading state
  if (loading) {
    return (
      <section className="border-t border-[#25231f]/10 bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
              From Our Customers
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.03em] text-[#25231f] sm:text-[52px] md:text-[60px]">
              Loved by people
              <br />
              <span className="italic text-[#77736b]">
                who care about their skin.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-[330px] animate-pulse border border-[#25231f]/10 bg-white p-8"
              >
                <div className="h-3 w-20 bg-[#e7e3dc]" />

                <div className="mt-8 space-y-3">
                  <div className="h-3 w-full bg-[#e7e3dc]" />
                  <div className="h-3 w-[90%] bg-[#e7e3dc]" />
                  <div className="h-3 w-[75%] bg-[#e7e3dc]" />
                </div>

                <div className="mt-12 h-10 w-10 rounded-full bg-[#e7e3dc]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // No testimonials
  if (testimonials.length === 0) {
    return (
      <section className="border-t border-[#25231f]/10 bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center sm:px-10 md:py-28 lg:px-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
            From Our Customers
          </p>

          <h2 className="mt-5 font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.03em] text-[#25231f] sm:text-[52px] md:text-[60px]">
            Loved by people
            <br />
            <span className="italic text-[#77736b]">
              who care about their skin.
            </span>
          </h2>

          <p className="mt-6 text-sm text-[#77736b]">
            No testimonials available yet.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t border-[#25231f]/10 bg-[#f8f6f1]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">

        {/* SECTION HEADER */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
              From Our Customers
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.03em] text-[#25231f] sm:text-[52px] md:text-[60px]">
              Loved by people
              <br />
              <span className="italic text-[#77736b]">
                who care about their skin.
              </span>
            </h2>
          </div>

          <div className="max-w-xs md:pb-2">
            <p className="text-[13px] leading-6 text-[#77736b]">
              Honest experiences from customers who have made
              Koviea Touch part of their everyday self-care ritual.
            </p>
          </div>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group flex min-h-[330px] flex-col justify-between border border-[#25231f]/10 bg-white px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#25231f]/20 sm:px-8"
            >
              <div>
                {/* Stars + Quote */}
                <div className="flex items-center justify-between">
                  <Stars
                    rating={Number(testimonial.rating)}
                  />

                  <span className="font-serif text-[42px] leading-none text-[#ddd8cf]">
                    “
                  </span>
                </div>

                {/* Review */}
                <blockquote className="mt-8 font-serif text-[20px] leading-[1.55] text-[#302e29]">
                  {testimonial.review}
                </blockquote>
              </div>

              {/* Customer */}
              <div className="mt-10 flex items-center gap-4">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.customer_name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9e5dd] text-[11px] font-medium tracking-[0.08em] text-[#625d54]">
                    {getInitials(
                      testimonial.customer_name
                    )}
                  </div>
                )}

                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#302e29]">
                    {testimonial.customer_name}
                  </p>

                  <p className="mt-1 text-[11px] text-[#99938a]">
                    Verified Customer
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER DETAIL */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[#25231f]/15" />

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#99938a]">
            Koviea Touch
          </p>

          <div className="h-px w-10 bg-[#25231f]/15" />
        </div>
      </div>
    </section>
  )
}