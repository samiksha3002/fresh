import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/account",
        "/cart",
        "/checkout",
        "/order/",
        "/*/account",
        "/*/cart",
        "/*/checkout",
        "/*/order/",
      ],
    },
    sitemap: "https://www.koveatouch.com/sitemap.xml",
  }
}
