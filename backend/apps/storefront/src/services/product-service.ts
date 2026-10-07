import redis from "../config/redis"
import { getProductByHandle } from "../lib/data/products"

export async function getProductByHandleCached(handle: string, countryCode: string) {
  const cacheKey = `product:${countryCode}:${handle}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    return JSON.parse(cached)
  }

  const product = await getProductByHandle({ handle, countryCode })
  if (product) {
    await redis.set(cacheKey, JSON.stringify(product), "EX", 300) // cache 5 min
  }
  return product
}
