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
  const params = await props.params
  const { countryCode } = params

  // --------------------------------------------------
  // GET REGION
  // --------------------------------------------------
  const region = await getRegion(countryCode)

  // --------------------------------------------------
  // GET COLLECTIONS
  // --------------------------------------------------
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  // --------------------------------------------------
  // DEBUG LOGS
  // These will help us diagnose production issues
  // without breaking the entire homepage.
  // --------------------------------------------------
  console.log("KOVEA HOME:", {
    countryCode,
    regionId: region?.id,
    regionName: region?.name,
    collectionsCount: collections?.length ?? 0,
  })

  return (
    <>
      {/* ==================================================
          HERO
          Always render this section.
          It should NOT depend on region/collections.
      ================================================== */}
      <Hero />

      {/* ==================================================
          CATEGORIES
      ================================================== */}
      <HomeCategories />

      {/* ==================================================
          BEST SELLERS
          Requires a valid Medusa region.
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
          Requires both collections and region.
      ================================================== */}
      {region && collections?.length > 0 && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts
              collections={collections}
              region={region}
            />
          </ul>
        </div>
      )}

      {/* ==================================================
          CUSTOMER TESTIMONIALS
      ================================================== */}
      <TestimonialsSection />

      {/* ==================================================
          BRAND STRIP
      ================================================== */}
      <InfiniteBrandStrip />
    </>
  )
}