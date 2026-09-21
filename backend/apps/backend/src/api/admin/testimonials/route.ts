import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TESTIMONIALS_MODULE } from "../../../modules/testimonials"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const testimonials = await testimonialModule.listTestimonials(
    {},
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

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const {
    customer_name,
    customer_email,
    rating,
    review,
    avatar,
    product_id,
    status,
    is_featured,
  } = req.body as {
    customer_name: string
    customer_email?: string
    rating: number
    review: string
    avatar?: string
    product_id?: string
    status?: "pending" | "approved" | "rejected"
    is_featured?: boolean
  }

  if (!customer_name || !rating || !review) {
    return res.status(400).json({
      message: "customer_name, rating and review are required",
    })
  }

  const testimonial = await testimonialModule.createTestimonials({
    customer_name,
    customer_email: customer_email || null,
    rating,
    review,
    avatar: avatar || null,
    product_id: product_id || null,
    source: "admin",
    status: status || "approved",
    is_featured: is_featured ?? false,
  })

  res.status(201).json({
    testimonial,
  })
}