import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import BestSellersClient from "./best-sellers-client"

export default async function BestSellers({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  if (!region?.id) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
      order: "-created_at",
      fields:
        "id,title,handle,thumbnail,description,*variants.calculated_price",
    },
  })

  if (!products?.length) {
    return null
  }

  const formattedProducts = products.map((product) => {
    const variant = product.variants?.[0]
    const calculatedPrice = variant?.calculated_price
    const amount = calculatedPrice?.calculated_amount
    const currencyCode =
      calculatedPrice?.currency_code?.toUpperCase()

    let formattedPrice: string | null = null

    if (
      typeof amount === "number" &&
      currencyCode
    ) {
      try {
        formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyCode,
        }).format(amount)
      } catch {
        formattedPrice = `${amount} ${currencyCode}`
      }
    }

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      thumbnail: product.thumbnail,
      description: product.description,
      price: formattedPrice,
    }
  })

  return <BestSellersClient products={formattedProducts} />
}