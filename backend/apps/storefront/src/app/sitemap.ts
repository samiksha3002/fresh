import type { MetadataRoute } from "next"
import { sdk } from "@lib/config"

export const revalidate = 3600

const SITE_URL = "https://www.koveatouch.com"
const PAGE_SIZE = 100

type Region = { id: string; countries?: { iso_2: string }[] }
type Product = { handle: string | null }
type Category = { handle: string; is_active: boolean; is_internal: boolean }

// Match the countries accepted by middleware, intersected with actual regions.
const supportedCountries = new Set(
  (process.env.NEXT_PUBLIC_SUPPORTED_COUNTRIES || "us,au,in,de,dk,es")
    .split(",")
    .map((country) => country.trim().toLowerCase())
    .filter(Boolean)
)

// Category routing joins catch-all segments back into the stored handle.
const encodeHandle = (handle: string) =>
  handle.split("/").map(encodeURIComponent).join("/")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the public Store API without customer authentication. Let API failures
  // surface instead of publishing an incomplete or invented sitemap.
  const { regions } = await sdk.client.fetch<{ regions: Region[] }>(
    "/store/regions",
    { cache: "force-cache", next: { revalidate } }
  )
  const urls = new Set<string>()
  const categories: Category[] = []

  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { product_categories, count } = await sdk.client.fetch<{
      product_categories: Category[]
      count: number
    }>("/store/product-categories", {
      query: {
        limit: PAGE_SIZE,
        offset,
        fields: "handle,is_active,is_internal",
      },
      cache: "force-cache",
      next: { revalidate },
    })
    // The Store API enforces public/active categories server-side. Request the
    // flags as response fields and fail closed if either is absent or invalid.
    categories.push(
      ...product_categories.filter(
        (category) => category.is_active === true && category.is_internal === false
      )
    )
    if (offset + product_categories.length >= count) break
    if (!product_categories.length) throw new Error("Category pagination stalled")
  }

  for (const region of regions) {
    const countries = Array.from(
      new Set(
        (region.countries || [])
          .map(({ iso_2 }) => iso_2.toLowerCase())
          .filter((country) => supportedCountries.has(country))
      )
    )
    if (!countries.length) continue

    for (const country of countries) {
      urls.add(`${SITE_URL}/${country}`)
      urls.add(`${SITE_URL}/${country}/store`)
      for (const category of categories) {
        if (category.handle && category.is_active && !category.is_internal) {
          urls.add(`${SITE_URL}/${country}/categories/${encodeHandle(category.handle)}`)
        }
      }
    }

    for (let offset = 0; ; offset += PAGE_SIZE) {
      const { products, count } = await sdk.client.fetch<{
        products: Product[]
        count: number
      }>("/store/products", {
        query: { region_id: region.id, limit: PAGE_SIZE, offset, fields: "handle" },
        cache: "force-cache",
        next: { revalidate },
      })
      // The Store API exposes published products in the configured sales channel.
      for (const product of products) {
        if (!product.handle || product.handle.includes("/")) continue
        for (const country of countries) {
          urls.add(`${SITE_URL}/${country}/products/${encodeURIComponent(product.handle)}`)
        }
      }
      if (offset + products.length >= count) break
      if (!products.length) throw new Error("Product pagination stalled")
    }
  }

  return Array.from(urls).sort().map((url) => ({ url }))
}
