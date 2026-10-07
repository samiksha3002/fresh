import "server-only"

import { cookies as nextCookies } from "next/headers"

/**
 * Get authentication headers for Medusa requests.
 *
 * Returns an Authorization header when the customer is logged in.
 * Returns an empty object for guests.
 */
export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) {
      return {}
    }

    return {
      authorization: `Bearer ${token}`,
    }
  } catch {
    return {}
  }
}

/**
 * Get the Medusa cache ID from the current request cookies.
 */
export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies()
    const cacheId = cookies.get("_medusa_cache_id")?.value

    if (!cacheId) {
      return ""
    }

    return `${tag}-${cacheId}`
  } catch {
    return ""
  }
}

/**
 * Get Next.js cache options for Medusa requests.
 *
 * If no cache ID exists, return an empty object.
 */
export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | {}> => {
  try {
    const cacheTag = await getCacheTag(tag)

    if (!cacheTag) {
      return {}
    }

    return {
      tags: [cacheTag],
    }
  } catch {
    return {}
  }
}

/**
 * Store Medusa customer JWT.
 */
export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()

  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

/**
 * Remove Medusa customer JWT.
 */
export const removeAuthToken = async () => {
  const cookies = await nextCookies()

  cookies.set("_medusa_jwt", "", {
    maxAge: -1,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

/**
 * Get current Medusa cart ID.
 */
export const getCartId = async () => {
  try {
    const cookies = await nextCookies()

    return cookies.get("_medusa_cart_id")?.value
  } catch {
    return undefined
  }
}

/**
 * Store Medusa cart ID.
 */
export const setCartId = async (cartId: string) => {
  const cookies = await nextCookies()

  cookies.set("_medusa_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

/**
 * Remove Medusa cart ID.
 */
export const removeCartId = async () => {
  const cookies = await nextCookies()

  cookies.set("_medusa_cart_id", "", {
    maxAge: -1,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}