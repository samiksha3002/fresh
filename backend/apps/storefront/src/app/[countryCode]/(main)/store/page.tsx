import { Metadata } from "next"
import { buildCanonicalUrl, CanonicalSearchParams } from "@lib/util/canonical-url"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export async function generateMetadata(props: Params): Promise<Metadata> {
  const [{ countryCode }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ])
  return {
    title: "Store | Kovea Touch",
    description: "Explore all of our products.",
    alternates: {
      canonical: buildCanonicalUrl({
        countryCode,
        segments: ["store"],
        searchParams,
      }),
    },
  }
}

type Params = {
  searchParams: Promise<
    CanonicalSearchParams & {
      sortBy?: SortOptions
      page?: string
    }
  >
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
