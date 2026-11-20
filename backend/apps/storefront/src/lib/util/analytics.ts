export const MEASUREMENT_ID = "G-LL0GGMMC7N"
export const CONSENT_KEY = "fresh-analytics-consent-v1"
export type AnalyticsConsent = "accepted" | "rejected"

const staticRoutes = new Set([
  "store",
  "cart",
  "checkout",
  "about",
  "privacy-policy",
  "refund-policy",
  "shipping-policy",
  "terms-of-service",
  "dermatologist-consultation",
])

// Only known route names leave the browser. Never send IDs, tokens or handles.
export function analyticsPath(pathname: string): string {
  const parts = pathname.split(/[?#]/)[0].split("/").filter(Boolean)
  const country = /^[a-z]{2}$/.test(parts[0] || "") ? parts.shift() : null
  const prefix = country ? `/${country}` : ""
  if (!parts.length) return prefix || "/"
  const [route] = parts
  if (staticRoutes.has(route) && parts.length === 1) return `${prefix}/${route}`
  if (["products", "collections", "categories"].includes(route)) {
    return `${prefix}/${route}/detail`
  }
  if (route === "account") return `${prefix}/account`
  if (route === "order") return `${prefix}/order`
  return `${prefix}/other`
}

export function readConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === "accepted" || value === "rejected" ? value : null
  } catch {
    return null
  }
}

export function clearAnalyticsCookies() {
  const host = window.location.hostname.split(".")
  const domains = ["", ...host.map((_, i) => host.slice(i).join("."))]
  const paths = window.location.pathname.split("/")
  const cookiePaths = [
    "/",
    ...paths.map((_, i) => paths.slice(0, i + 1).join("/") || "/"),
  ]
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim()
    if (name !== "_ga" && !name.startsWith("_ga_")) return
    domains.forEach((domain) =>
      cookiePaths.forEach((path) => {
        document.cookie = `${name}=; Max-Age=0; Path=${path}${
          domain ? `; Domain=${domain}` : ""
        }`
      })
    )
  })
}
