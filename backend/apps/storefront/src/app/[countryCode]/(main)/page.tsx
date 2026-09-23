import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HomeCategories from "@modules/home/components/categories"
import BestSellers from "@modules/home/components/best-sellers"
import LocalGrid from "@modules/home/components/local-grid"
import TestimonialsSection from "@modules/home/components/Testimonials/TestimonialsSection"
import InfiniteBrandStrip from "@modules/home/components/infinite-brand-strip"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Kovea Touch | Skincare E-Commerce",
  description:
    "Discover our exclusive collections designed for modern skincare routine.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <HomeCategories />

      {/* =====================================================
          BEST SELLERS
      ====================================================== */}
      <BestSellers region={region} />

      {/* =====================================================
          LOCAL / EDITORIAL GRID
      ====================================================== */}
      <LocalGrid />

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts
            collections={collections}
            region={region}
          />
        </ul>
      </div>

      {/* =====================================================
          CUSTOMER TESTIMONIALS
      ====================================================== */}
      <TestimonialsSection />
      <InfiniteBrandStrip />
    </>
  )
}