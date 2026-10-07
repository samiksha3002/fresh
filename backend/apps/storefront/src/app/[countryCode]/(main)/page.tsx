import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HomeCategories from "@modules/home/components/categories"
import BestSellers from "@modules/home/components/best-sellers"
import SignatureProducts from "@modules/layout/components/signature-products"
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
  const { countryCode } = await props.params

  // ==================================================
  // GET REGION + COLLECTIONS IN PARALLEL
  // ==================================================

  const [region, collectionsResult] = await Promise.all([
    getRegion(countryCode),
    listCollections({
      fields: "id, handle, title",
    }),
  ])

  const collections = collectionsResult?.collections || []

  // ==================================================
  // DEBUG
  // ==================================================

  console.log("KOVEA HOME:", {
    countryCode,
    regionId: region?.id,
    regionName: region?.name,
    collectionsCount: collections.length,
  })

  return (
    <>
      {/* ==================================================
          HERO
      ================================================== */}

      <Hero />

      {/* ==================================================
          CATEGORIES
      ================================================== */}

      <HomeCategories />

      {/* ==================================================
          BEST SELLERS
          Only render when region exists
      ================================================== */}

      {region && <BestSellers region={region} />}

      {/* ==================================================
          SIGNATURE PRODUCTS
      ================================================== */}

      <SignatureProducts />

      {/* ==================================================
          LOCAL / EDITORIAL GRID
      ================================================== */}

      <LocalGrid />

      {/* ==================================================
          FEATURED PRODUCTS
          Only render when region + collections exist
      ================================================== */}

      {region && collections.length > 0 && (
        <section className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts
              collections={collections}
              region={region}
            />
          </ul>
        </section>
      )}

      {/* ==================================================
          TESTIMONIALS
      ================================================== */}

      <TestimonialsSection />

      {/* ==================================================
          BRAND STRIP
      ================================================== */}

      <InfiniteBrandStrip />
    </>
  )
}