"use client"

import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading } from "@medusajs/ui"
import { useEffect, useState } from "react"

type Testimonial = {
  id: string
  customer_name: string
  customer_email: string | null
  rating: number
  review: string
  avatar: string | null
  product_id: string | null
  source: "admin" | "customer"
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  created_at?: string
}

type FilterType = "all" | "pending" | "approved" | "rejected"

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [showAddForm, setShowAddForm] = useState(false)

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    rating: 5,
    review: "",
    status: "approved" as "pending" | "approved" | "rejected",
    is_featured: false,
  })

  // =========================
  // LOAD TESTIMONIALS
  // =========================

  const loadTestimonials = async () => {
    try {
      setLoading(true)

      const response = await fetch("/admin/testimonials", {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to load testimonials")
      }

      const data = await response.json()

      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error("Failed to load testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (
    testimonial: Testimonial,
    status: "approved" | "rejected"
  ) => {
    try {
      setActionLoading(testimonial.id)

      const response = await fetch(
        `/admin/testimonials/${testimonial.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update testimonial")
      }

      await loadTestimonials()
    } catch (error) {
      console.error("Failed to update testimonial:", error)
      alert("Failed to update testimonial")
    } finally {
      setActionLoading(null)
    }
  }

  // =========================
  // DELETE
  // =========================

  const deleteTestimonial = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    )

    if (!confirmed) {
      return
    }

    try {
      setActionLoading(id)

      const response = await fetch(`/admin/testimonials/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete testimonial")
      }

      await loadTestimonials()
    } catch (error) {
      console.error("Failed to delete testimonial:", error)
      alert("Failed to delete testimonial")
    } finally {
      setActionLoading(null)
    }
  }

  // =========================
  // ADD TESTIMONIAL
  // =========================

  const addTestimonial = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!form.customer_name || !form.review) {
      alert("Customer name and review are required.")
      return
    }

    try {
      setActionLoading("new")

      const response = await fetch("/admin/testimonials", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: form.customer_name,
          customer_email: form.customer_email || undefined,
          rating: form.rating,
          review: form.review,
          status: form.status,
          is_featured: form.is_featured,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create testimonial")
      }

      setForm({
        customer_name: "",
        customer_email: "",
        rating: 5,
        review: "",
        status: "approved",
        is_featured: false,
      })

      setShowAddForm(false)

      await loadTestimonials()
    } catch (error) {
      console.error("Failed to create testimonial:", error)
      alert("Failed to create testimonial")
    } finally {
      setActionLoading(null)
    }
  }

  // =========================
  // FILTER
  // =========================

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.status === filter
        )

  const pendingCount = testimonials.filter(
    (item) => item.status === "pending"
  ).length

  const approvedCount = testimonials.filter(
    (item) => item.status === "approved"
  ).length

  const rejectedCount = testimonials.filter(
    (item) => item.status === "rejected"
  ).length

  // =========================
  // UI
  // =========================

  return (
    <Container className="p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <Heading level="h1">Testimonials</Heading>

          <p className="mt-1 text-sm text-ui-fg-subtle">
            Manage customer reviews and testimonials.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-md bg-ui-button-inverted px-4 py-2 text-sm font-medium text-ui-fg-on-inverted"
        >
          {showAddForm ? "Close" : "+ Add Testimonial"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="border-b bg-ui-bg-subtle px-6 py-6">
          <div className="max-w-3xl">
            <Heading level="h2">Add Testimonial</Heading>

            <form
              onSubmit={addTestimonial}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Name
                </label>

                <input
                  type="text"
                  value={form.customer_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      customer_name: e.target.value,
                    })
                  }
                  className="w-full rounded-md border bg-ui-bg-base px-3 py-2 text-sm outline-none"
                  placeholder="Priya Sharma"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Email
                </label>

                <input
                  type="email"
                  value={form.customer_email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      customer_email: e.target.value,
                    })
                  }
                  className="w-full rounded-md border bg-ui-bg-base px-3 py-2 text-sm outline-none"
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Rating
                </label>

                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rating: Number(e.target.value),
                    })
                  }
                  className="rounded-md border bg-ui-bg-base px-3 py-2 text-sm"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Review
                </label>

                <textarea
                  value={form.review}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      review: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full rounded-md border bg-ui-bg-base px-3 py-2 text-sm outline-none"
                  placeholder="Write customer review..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as
                        | "pending"
                        | "approved"
                        | "rejected",
                    })
                  }
                  className="rounded-md border bg-ui-bg-base px-3 py-2 text-sm"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_featured: e.target.checked,
                    })
                  }
                />

                Featured testimonial
              </label>

              <button
                type="submit"
                disabled={actionLoading === "new"}
                className="rounded-md bg-ui-button-inverted px-5 py-2 text-sm font-medium text-ui-fg-on-inverted disabled:opacity-50"
              >
                {actionLoading === "new"
                  ? "Saving..."
                  : "Save Testimonial"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            filter === "all"
              ? "bg-ui-bg-base-pressed font-medium"
              : "text-ui-fg-subtle"
          }`}
        >
          All ({testimonials.length})
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            filter === "pending"
              ? "bg-ui-bg-base-pressed font-medium"
              : "text-ui-fg-subtle"
          }`}
        >
          Pending ({pendingCount})
        </button>

        <button
          onClick={() => setFilter("approved")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            filter === "approved"
              ? "bg-ui-bg-base-pressed font-medium"
              : "text-ui-fg-subtle"
          }`}
        >
          Approved ({approvedCount})
        </button>

        <button
          onClick={() => setFilter("rejected")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            filter === "rejected"
              ? "bg-ui-bg-base-pressed font-medium"
              : "text-ui-fg-subtle"
          }`}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {loading ? (
          <div className="py-10 text-center text-sm text-ui-fg-subtle">
            Loading testimonials...
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm text-ui-fg-subtle">
              No testimonials found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-lg border bg-ui-bg-base p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Customer */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">
                        {testimonial.customer_name}
                      </h3>

                      <span className="text-sm">
                        {"★".repeat(testimonial.rating)}
                        {"☆".repeat(5 - testimonial.rating)}
                      </span>
                    </div>

                    {testimonial.customer_email && (
                      <p className="mt-1 text-xs text-ui-fg-subtle">
                        {testimonial.customer_email}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-6">
                      "{testimonial.review}"
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-ui-bg-subtle px-2.5 py-1 text-xs">
                        {testimonial.status}
                      </span>

                      <span className="rounded-full bg-ui-bg-subtle px-2.5 py-1 text-xs">
                        {testimonial.source}
                      </span>

                      {testimonial.is_featured && (
                        <span className="rounded-full bg-ui-bg-subtle px-2.5 py-1 text-xs">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {testimonial.status !== "approved" && (
                      <button
                        onClick={() =>
                          updateStatus(testimonial, "approved")
                        }
                        disabled={actionLoading === testimonial.id}
                        className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-ui-bg-subtle disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}

                    {testimonial.status !== "rejected" && (
                      <button
                        onClick={() =>
                          updateStatus(testimonial, "rejected")
                        }
                        disabled={actionLoading === testimonial.id}
                        className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-ui-bg-subtle disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteTestimonial(testimonial.id)
                      }
                      disabled={actionLoading === testimonial.id}
                      className="rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-ui-bg-subtle disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Testimonials",
  icon: ChatBubbleLeftRight,
  rank: 10,
})

export default TestimonialsPage