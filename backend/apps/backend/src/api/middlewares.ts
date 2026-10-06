import { defineMiddlewares } from "@medusajs/framework/http"

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
  ],
})