import { model } from "@medusajs/framework/utils"

const Testimonial = model.define("testimonial", {
  id: model.id().primaryKey(),

  customer_name: model.text(),

  customer_email: model.text().nullable(),

  rating: model.number(),

  review: model.text(),

  avatar: model.text().nullable(),

  product_id: model.text().nullable(),

  source: model
    .enum(["admin", "customer"])
    .default("customer"),

  status: model
    .enum(["pending", "approved", "rejected"])
    .default("pending"),

  is_featured: model.boolean().default(false),
})

export default Testimonial