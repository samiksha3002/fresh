import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION =
  process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

/**
 * Countries that are currently supported by the storefront.
 *
 * IMPORTANT:
 * Keep this list aligned with the countries configured
 * inside your Medusa region.
 *
 * You can also provide:
 *
 * NEXT_PUBLIC_SUPPORTED_COUNTRIES=us,au,in,de,dk,es
 *
 * in your environment variables.
 */
const ENV_SUPPORTED_COUNTRIES =
  process.env.NEXT_PUBLIC_SUPPORTED_COUNTRIES

const SUPPORTED_COUNTRIES = new Set(
  (
    ENV_SUPPORTED_COUNTRIES ||
    "us,au,in,de,dk,es"
  )
    .split(",")
    .map((country) => country.trim().toLowerCase())
    .filter(Boolean)
)

/**
 * Get the country from the URL first.
 *
 * Example:
 * /us/products/abc
 * /au/products/abc
 * /in/products/abc
 */
function getCountryFromPath(request: NextRequest) {
  const firstSegment =
    request.nextUrl.pathname
      .split("/")
      .filter(Boolean)[0]
      ?.toLowerCase()

  if (
    firstSegment &&
    SUPPORTED_COUNTRIES.has(firstSegment)
  ) {
    return firstSegment
  }

  return null
}

/**
 * Get the visitor's country from Vercel's
 * geo header.
 *
 * This does NOT make a network request.
 */
function getCountryFromVercel(request: NextRequest) {
  const country =
    request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

  if (
    country &&
    SUPPORTED_COUNTRIES.has(country)
  ) {
    return country
  }

  return null
}

/**
 * Middleware
 *
 * IMPORTANT:
 * No Medusa API call here.
 *
 * Middleware must stay extremely lightweight because
 * it runs before the actual Next.js page request.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  /**
   * --------------------------------------------------------
   * 1. Static / internal requests
   * --------------------------------------------------------
   */
  if (
    pathname.includes(".") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next()
  }

  /**
   * --------------------------------------------------------
   * 2. Check whether URL already has a valid country
   * --------------------------------------------------------
   */
  const urlCountry =
    getCountryFromPath(request)

  if (urlCountry) {
    const response = NextResponse.next()

    /**
     * Preserve Medusa cache ID if one exists.
     * Create one only when needed.
     */
    if (
      !request.cookies.get("_medusa_cache_id")
    ) {
      response.cookies.set(
        "_medusa_cache_id",
        crypto.randomUUID(),
        {
          maxAge: 60 * 60 * 24,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        }
      )
    }

    return response
  }

  /**
   * --------------------------------------------------------
   * 3. No country in URL
   * --------------------------------------------------------
   *
   * Use Vercel's country detection.
   *
   * Example:
   *
   * USA       → /us
   * Australia → /au
   * India     → /in
   *
   * If Vercel cannot determine the country,
   * fall back to the default region.
   */
  const detectedCountry =
    getCountryFromVercel(request)

  const countryCode =
    detectedCountry ||
    (
      SUPPORTED_COUNTRIES.has(
        DEFAULT_REGION.toLowerCase()
      )
        ? DEFAULT_REGION.toLowerCase()
        : Array.from(
            SUPPORTED_COUNTRIES
          )[0] || "us"
    )

  /**
   * --------------------------------------------------------
   * 4. Build redirect
   * --------------------------------------------------------
   */
  const search =
    request.nextUrl.search || ""

  const redirectPath =
    pathname === "/"
      ? ""
      : pathname

  const redirectUrl =
    `${request.nextUrl.origin}/${countryCode}${redirectPath}${search}`

  const response =
    NextResponse.redirect(
      redirectUrl,
      307
    )

  /**
   * Set Medusa cache ID during redirect.
   */
  response.cookies.set(
    "_medusa_cache_id",
    request.cookies.get(
      "_medusa_cache_id"
    )?.value || crypto.randomUUID(),
    {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    }
  )

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}