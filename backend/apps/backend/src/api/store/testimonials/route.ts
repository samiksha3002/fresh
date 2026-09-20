import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TESTIMONIALS_MODULE } from "../../../modules/testimonials"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const testimonialModule = req.scope.resolve(TESTIMONIALS_MODULE)

  const testimonials = await testimonialModule.listTestimonials(
    {
      status: "approved",
    },
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