"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

/**
 * List products with pagination
 */
export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  // Parallelize awaits for speed
  const [region, headers, next] = await Promise.all([
    countryCode ? getRegion(countryCode) : retrieveRegion(regionId!),
    getAuthHeaders(),
    getCacheOptions("products"),
  ])

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  // Keep original fields intact
  const { products, count } = await sdk.client.fetch<{
    products: HttpTypes.StoreProduct[]
    count: number
  }>("/store/products", {
    method: "GET",
    query: {
      limit,
      offset,
      region_id: region.id,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
      ...queryParams,
    },
    headers,
    next: { ...next, revalidate: 60 },
    cache: "force-cache",
  })

  const nextPage = count > offset + limit ? pageParam + 1 : null

  return {
    response: { products, count },
    nextPage,
    queryParams,
  }
}

/**
 * List products with sorting
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: { ...queryParams, limit: 100 },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)
  const pageParam = (page - 1) * limit
  const nextPage = count > pageParam + limit ? pageParam + limit : null
  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: { products: paginatedProducts, count },
    nextPage,
    queryParams,
  }
}

/**
 * Get a single product by handle
 */
export const getProductByHandle = async ({
  handle,
  countryCode,
}: {
  handle: string
  countryCode: string
}): Promise<HttpTypes.StoreProduct | null> => {
  if (!handle || !countryCode) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    pageParam: 1,
    countryCode,
    queryParams: { handle, limit: 1 },
  })

  return products[0] || null
}