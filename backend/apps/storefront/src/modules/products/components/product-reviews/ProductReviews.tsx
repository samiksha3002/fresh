"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Testimonial = {
  id: string
  customer_name: string
  rating: number
  review: string
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  created_at?: string
}

type ProductReviewsProps = {
  productId: string
}

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://localhost:9000"

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY ||
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  ""

const ProductReviews = ({
  productId,
}: ProductReviewsProps) => {
  const router = useRouter()

  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Review form
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // =========================================================
  // LOAD REVIEWS
  // =========================================================

  const loadReviews = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${MEDUSA_BACKEND_URL}/store/testimonials?product_id=${encodeURIComponent(
          productId
        )}`,
        {
          headers: {
            "x-publishable-api-key": PUBLISHABLE_KEY,
          },
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to load reviews")
      }

      const data = await response.json()

      setReviews(data.testimonials || [])
    } catch (error) {
      console.error("Failed to load product reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      loadReviews()
    }
  }, [productId])

  // =========================================================
  // OPEN REVIEW FORM
  // =========================================================

  const handleWriteReview = () => {
    setError("")
    setSuccess("")

    setShowForm(true)

    window.setTimeout(() => {
      document
        .getElementById("write-review-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
    }, 100)
  }

  // =========================================================
  // SUBMIT REVIEW
  // =========================================================

  const handleSubmitReview = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!customerName.trim()) {
      setError("Please enter your name.")
      return
    }

    if (!customerEmail.trim()) {
      setError("Please enter your email.")
      return
    }

    if (!reviewText.trim()) {
      setError("Please write a review.")
      return
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.")
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch(
        `${MEDUSA_BACKEND_URL}/store/testimonials`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": PUBLISHABLE_KEY,
          },

          body: JSON.stringify({
            customer_name: customerName.trim(),
            customer_email: customerEmail.trim(),
            rating,
            review: reviewText.trim(),
            product_id: productId,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push(
            `/account?redirect=${encodeURIComponent(
              window.location.pathname
            )}`
          )

          return
        }

        throw new Error(
          data?.message || "Failed to submit your review."
        )
      }

      // Reset form
      setCustomerName("")
      setCustomerEmail("")
      setRating(5)
      setReviewText("")

      setShowForm(false)

      setSuccess(
        "Thank you! Your review has been submitted and is waiting for approval."
      )

      // Reload approved reviews
      await loadReviews()
    } catch (error) {
      console.error("Failed to submit review:", error)

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  // =========================================================
  // AVERAGE RATING
  // =========================================================

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      : 0

  // =========================================================
  // UI
  // =========================================================

  return (
    <section className="border-t border-zinc-100 mt-12 pt-10">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Customer Reviews
          </p>

          <h2 className="text-3xl font-serif text-zinc-900 mt-2">
            What our customers say
          </h2>
        </div>

        <div className="flex items-center gap-4">

          {reviews.length > 0 && (
            <div className="flex items-center gap-3">

              <div className="text-2xl font-medium text-zinc-900">
                {averageRating.toFixed(1)}
              </div>

              <div>
                <div className="text-yellow-500 text-sm tracking-wide">
                  {"★".repeat(Math.round(averageRating))}
                  {"☆".repeat(
                    5 - Math.round(averageRating)
                  )}
                </div>

                <p className="text-xs text-zinc-500">
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"}
                </p>
              </div>

            </div>
          )}

          {/* Write Review */}
          <button
            type="button"
            onClick={handleWriteReview}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Write a Review
          </button>

        </div>
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {success && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* =====================================================
          REVIEW FORM
      ====================================================== */}

      {showForm && (
        <div
          id="write-review-form"
          className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8"
        >

          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Share your experience
              </p>

              <h3 className="mt-2 text-2xl font-serif text-zinc-900">
                Write a Review
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Your review will be published after approval.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setError("")
              }}
              className="text-2xl text-zinc-400 hover:text-zinc-900"
              aria-label="Close review form"
            >
              ×
            </button>

          </div>

          <form
            onSubmit={handleSubmitReview}
            className="mt-6 space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-900">
                Your Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                placeholder="Enter your name"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-900">
                Email Address
              </label>

              <input
                type="email"
                value={customerEmail}
                onChange={(event) =>
                  setCustomerEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-900">
                Your Rating
              </label>

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating
                        ? "text-yellow-500"
                        : "text-zinc-300"
                    } hover:scale-110`}
                    aria-label={`Rate ${star} out of 5`}
                  >
                    ★
                  </button>
                ))}

                <span className="ml-2 text-sm text-zinc-500">
                  {rating}/5
                </span>

              </div>
            </div>

            {/* Review */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-900">
                Your Review
              </label>

              <textarea
                value={reviewText}
                onChange={(event) =>
                  setReviewText(event.target.value)
                }
                placeholder="Tell us about your experience with this product..."
                rows={6}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-zinc-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-zinc-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting Review..."
                : "Submit Review"}
            </button>

          </form>
        </div>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading && (
        <div className="mt-8 text-sm text-zinc-500">
          Loading reviews...
        </div>
      )}

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {!loading && reviews.length === 0 && (
        <div className="mt-8 rounded-2xl bg-zinc-50 p-8 text-center">

          <div className="text-3xl text-zinc-300">
            ★
          </div>

          <p className="mt-3 text-sm font-medium text-zinc-700">
            No reviews yet.
          </p>

          <p className="text-xs text-zinc-400 mt-1">
            Be the first customer to review this product.
          </p>

        </div>
      )}

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      {!loading && reviews.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">

          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-zinc-100 bg-white p-6"
            >

              <div className="flex items-center justify-between gap-4">

                <div className="font-medium text-zinc-900">
                  {review.customer_name}
                </div>

                <div className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

              </div>

              <p className="mt-4 text-sm text-zinc-600 leading-7">
                "{review.review}"
              </p>

              {review.created_at && (
                <p className="mt-4 text-xs text-zinc-400">
                  {new Date(
                    review.created_at
                  ).toLocaleDateString()}
                </p>
              )}

            </article>
          ))}

        </div>
      )}

    </section>
  )
}

export default ProductReviews