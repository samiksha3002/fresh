
import { defineMiddlewares } from "@medusajs/framework/http"
import type {
  MedusaRequest,
  MedusaResponse,
  MedusaNextFunction,
} from "@medusajs/framework/http"

async function requestTimingLogger(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) {
  const startTime = process.hrtime.bigint()

  res.on("finish", () => {
    const durationMs =
      Number(process.hrtime.bigint() - startTime) / 1_000_000

    console.log(
      `[API TIMING] ${req.method} ${req.path} | Status: ${res.statusCode} | ${durationMs.toFixed(2)} ms`
    )
  })

  next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/*",
      middlewares: [requestTimingLogger],
    },
    {
      matcher: "/admin/*",
      middlewares: [requestTimingLogger],
    },
  ],
})
