import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TESTIMONIALS_MODULE } from "../../../../modules/testimonials"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const testimonial = await testimonialModule.retrieveTestimonial(
    req.params.id
  )

  res.json({
    testimonial,
  })
}

export async function PUT(
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
    source,
    status,
    is_featured,
  } = req.body as {
    customer_name?: string
    customer_email?: string | null
    rating?: number
    review?: string
    avatar?: string | null
    product_id?: string | null
    source?: "admin" | "customer"
    status?: "pending" | "approved" | "rejected"
    is_featured?: boolean
  }

  const testimonial = await testimonialModule.updateTestimonials({
    id: req.params.id,
    ...(customer_name !== undefined && { customer_name }),
    ...(customer_email !== undefined && { customer_email }),
    ...(rating !== undefined && { rating }),
    ...(review !== undefined && { review }),
    ...(avatar !== undefined && { avatar }),
    ...(product_id !== undefined && { product_id }),
    ...(source !== undefined && { source }),
    ...(status !== undefined && { status }),
    ...(is_featured !== undefined && { is_featured }),
  })

  res.json({
    testimonial,
  })
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  await testimonialModule.deleteTestimonials(req.params.id)

  res.json({
    id: req.params.id,
    deleted: true,
  })
}