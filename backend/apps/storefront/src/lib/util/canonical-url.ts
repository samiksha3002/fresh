export const CANONICAL_ORIGIN = "https://www.koveatouch.com"

export type CanonicalSearchParams = Record<
  string,
  string | string[] | undefined
>

const trackingParameters = new Set([
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "twclid",
  "yclid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "_gl",
])

// Segments are decoded Next.js route parameters. Keep query values that may
// affect content (including pagination, sorting and filters); never strip them
// merely because the current page does not implement a particular filter.
export function buildCanonicalUrl({
  countryCode,
  segments = [],
  searchParams = {},
  equivalentProductVariants = false,
}: {
  countryCode: string
  segments?: readonly string[]
  searchParams?: CanonicalSearchParams
  equivalentProductVariants?: boolean
}): string {
  if (!/^[a-z]{2}$/i.test(countryCode))
    throw new Error("Invalid canonical country")
  if (
    segments.some((segment) => !segment || segment === "." || segment === "..")
  ) {
    throw new Error("Invalid canonical path segment")
  }
  const path = [countryCode.toLowerCase(), ...segments]
    .map(encodeURIComponent)
    .join("/")
  const url = new URL(`${CANONICAL_ORIGIN}/${path}`)
  Object.keys(searchParams)
    .sort()
    .forEach((key) => {
      const normalizedKey = key.toLowerCase()
      if (
        normalizedKey.startsWith("utm_") ||
        trackingParameters.has(normalizedKey) ||
        (equivalentProductVariants && key === "v_id")
      )
        return
      const value = searchParams[key]
      if (value === undefined) return
      for (const entry of Array.isArray(value) ? value : [value])
        url.searchParams.append(key, entry)
    })
  return url.toString()
}
