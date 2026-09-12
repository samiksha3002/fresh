import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-10 px-4 md:px-8 content-container max-w-7xl mx-auto gap-8"
      data-testid="category-container"
    >
      {/* Refinement / Filters Sidebar */}
      <div className="w-full small:w-64 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-200/80">
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
      </div>

      {/* Main Content */}
      <div className="w-full flex-1">
        
        {/* Category Header Banner / Breadcrumbs */}
        <div className="bg-[#f5f0ea] rounded-3xl p-8 mb-8 border border-black/5">
          <div className="flex flex-wrap items-center mb-3 text-xs uppercase tracking-widest text-zinc-500 gap-2">
            {parents &&
              parents.map((parent) => (
                <span key={parent.id} className="flex items-center">
                  <LocalizedClientLink
                    className="hover:text-black transition"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  <span className="ml-2">/</span>
                </span>
              ))}
            <span>Collection</span>
          </div>

          <h1 className="text-4xl font-serif font-normal text-zinc-900 tracking-tight" data-testid="category-page-title">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-sm text-zinc-600 mt-3 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Sub-categories List (if any) */}
        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-10 bg-white border border-zinc-200/80 rounded-2xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Subcategories</h3>
            <ul className="flex flex-wrap gap-3">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink 
                    href={`/categories/${c.handle}`}
                    className="px-4 py-2 rounded-full border border-zinc-200 text-sm font-medium bg-zinc-50 hover:bg-black hover:text-white transition inline-block"
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Products Grid with Suspense */}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}