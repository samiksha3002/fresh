import {
  defineMiddlewares,
  authenticate,
} from "@medusajs/framework/http"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/carts/*",
      middlewares: [
        async (req, res, next) => {
          const start = Date.now()

          res.on("finish", () => {
            console.log(
              `[API TIMING] ${req.method} ${req.originalUrl} → ${res.statusCode} → ${
                Date.now() - start
              }ms`
            )
          })

          next()
        },
      ],
    },

    // Require a logged-in customer to submit a testimonial.
    // GET stays public so the storefront can show approved reviews.
    {
      matcher: "/store/testimonials",
      method: ["POST"],
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
      ],
    },
  ],
})