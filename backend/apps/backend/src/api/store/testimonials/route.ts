import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

import { TESTIMONIALS_MODULE } from "../../../modules/testimonials"

// GET /store/testimonials
// Only approved testimonials are returned
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const productId = req.query.product_id as string | undefined

  const filters: {
    status: "approved"
    product_id?: string
  } = {
    status: "approved",
  }

  if (productId) {
    filters.product_id = productId
  }

  const testimonials = await testimonialModule.listTestimonials(
    filters,
    {
      order: {
        created_at: "DESC",
      },
    }
  )

  res.json({
    testimonials,
  })
}
// POST /store/testimonials
// Logged-in customer submits a review
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    return res.status(401).json({
      message: "You must be logged in to submit a review.",
    })
  }

  const {
    customer_name,
    customer_email,
    rating,
    review,
    avatar,
    product_id,
  } = req.body as {
    customer_name?: string
    customer_email?: string
    rating?: number
    review?: string
    avatar?: string
    product_id?: string
  }

  if (!customer_name || !rating || !review) {
    return res.status(400).json({
      message: "customer_name, rating and review are required.",
    })
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be between 1 and 5.",
    })
  }

  const testimonial = await testimonialModule.createTestimonials({
    customer_name,
    customer_email: customer_email || null,
    rating,
    review,
    avatar: avatar || null,
    product_id: product_id || null,

    // Customer submitted review
    source: "customer",

    // Admin must approve it
    status: "pending",

    // Customer cannot feature their own review
    is_featured: false,
  })

  res.status(201).json({
    message: "Review submitted successfully. It will appear after approval.",
    testimonial,
  })
}