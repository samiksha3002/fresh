"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { HttpTypes } from "@medusajs/types"
import { useMemo, useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type Tab = {
  id: string
  label: string
  content: React.ReactNode
}

/* ============================================================
   DESCRIPTION PARSER
   ============================================================ */

const parseProductDescription = (
  description?: string | null
) => {
  const result = {
    description: "",
    ingredients: "",
    benefits: "",
    howToUse: "",
  }

  if (!description?.trim()) {
    return result
  }

  const text = description
    .replace(/\r\n/g, "\n")
    .trim()

  const headingRegex =
    /(?:^|\n)\s*(Benefits?|Ingredients?|How\s+to\s+use|Directions?|Usage)\s*:?\s*(?=\n|$)/gi

  const matches = [
    ...text.matchAll(headingRegex),
  ]

  if (matches.length === 0) {
    result.description = text
    return result
  }

  /*
   * Content before the first heading = Description
   */

  const firstMatch = matches[0]

  result.description = text
    .slice(0, firstMatch.index)
    .trim()

  /*
   * Extract every section
   */

  matches.forEach(
    (match, index) => {
      const heading =
        match[1]
          ?.toLowerCase()
          .replace(/\s+/g, " ")
          .trim()

      const start =
        (match.index ?? 0) +
        match[0].length

      const nextMatch =
        matches[index + 1]

      const end = nextMatch
        ? nextMatch.index ?? text.length
        : text.length

      const content = text
        .slice(start, end)
        .trim()

      if (!content) {
        return
      }

      if (
        heading?.startsWith("benefit")
      ) {
        result.benefits = content
      }

      if (
        heading?.startsWith("ingredient")
      ) {
        result.ingredients = content
      }

      if (
        heading?.startsWith("how to use") ||
        heading?.startsWith("direction") ||
        heading?.startsWith("usage")
      ) {
        result.howToUse = content
      }
    }
  )

  return result
}

/* ============================================================
   CONTENT RENDERER
   ============================================================ */

const ProductText = ({
  content,
}: {
  content: string
}) => {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="space-y-4">
      {blocks.map(
        (block, index) => {
          const lines = block
            .split("\n")
            .map((line) =>
              line.trim()
            )
            .filter(Boolean)

          const bulletLines =
            lines.filter((line) =>
              /^[-•*]\s*/.test(line)
            )

          /*
           * Render bullet lists beautifully
           */

          if (
            bulletLines.length ===
            lines.length
          ) {
            return (
              <ul
                key={index}
                className="
                  space-y-2
                  pl-5
                  list-disc
                  marker:text-[#96745c]
                "
              >
                {lines.map(
                  (line, lineIndex) => (
                    <li
                      key={lineIndex}
                      className="
                        text-[14px]
                        md:text-[15px]
                        leading-7
                        text-[#625b55]
                      "
                    >
                      {line.replace(
                        /^[-•*]\s*/,
                        ""
                      )}
                    </li>
                  )
                )}
              </ul>
            )
          }

          return (
            <p
              key={index}
              className="
                text-[14px]
                md:text-[15px]
                leading-7
                text-[#625b55]
                whitespace-pre-line
              "
            >
              {block}
            </p>
          )
        }
      )}
    </div>
  )
}

/* ============================================================
   PRODUCT DETAILS
   ============================================================ */

const ProductDetails = ({
  product,
}: ProductTabsProps) => {
  const details = [
    {
      label: "Material",
      value: product.material,
    },
    {
      label: "Country of origin",
      value: product.origin_country,
    },
    {
      label: "Type",
      value: product.type?.value,
    },
    {
      label: "Weight",
      value: product.weight
        ? `${product.weight} g`
        : null,
    },
    {
      label: "Dimensions",
      value:
        product.length &&
        product.width &&
        product.height
          ? `${product.length}L × ${product.width}W × ${product.height}H`
          : null,
    },
  ].filter((item) => item.value)

  if (!details.length) {
    return null
  }

  return (
    <div className="mt-8 border-t border-black/[0.07] pt-6">
      <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[#9a9088]">
        Product details
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {details.map(
          (detail) => (
            <div key={detail.label}>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9088]">
                {detail.label}
              </p>

              <p className="mt-1 text-[14px] text-[#4f4944]">
                {detail.value}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

/* ============================================================
   SHIPPING
   ============================================================ */

const ShippingInfoTab = () => {
  return (
    <div className="grid grid-cols-1 gap-7 py-2">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0 text-[#96745c]">
          <FastDelivery />
        </div>

        <div>
          <p className="text-[14px] font-medium text-[#2b2724]">
            Fast delivery
          </p>

          <p className="mt-1 max-w-md text-[14px] leading-6 text-[#6d655f]">
            Your package will arrive in
            3–5 business days at your
            pickup location or in the
            comfort of your home.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0 text-[#96745c]">
          <Refresh />
        </div>

        <div>
          <p className="text-[14px] font-medium text-[#2b2724]">
            Simple exchanges
          </p>

          <p className="mt-1 max-w-md text-[14px] leading-6 text-[#6d655f]">
            If your product isn't quite
            right, we'll help you with
            a simple exchange.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0 text-[#96745c]">
          <Back />
        </div>

        <div>
          <p className="text-[14px] font-medium text-[#2b2724]">
            Easy returns
          </p>

          <p className="mt-1 max-w-md text-[14px] leading-6 text-[#6d655f]">
            Return your product according
            to our return policy and we'll
            help make the process simple.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MAIN PRODUCT TABS
   ============================================================ */

const ProductTabs = ({
  product,
}: ProductTabsProps) => {
  const parsed = useMemo(
    () =>
      parseProductDescription(
        product.description
      ),
    [product.description]
  )

  const tabs = useMemo(() => {
    const items: Tab[] = []

    /*
     * DESCRIPTION
     */

    if (parsed.description) {
      items.push({
        id: "description",
        label: "Description",
        content: (
          <div>
            <ProductText
              content={
                parsed.description
              }
            />

            <ProductDetails
              product={product}
            />
          </div>
        ),
      })
    }

    /*
     * INGREDIENTS
     */

    if (parsed.ingredients) {
      items.push({
        id: "ingredients",
        label: "Ingredients",
        content: (
          <ProductText
            content={
              parsed.ingredients
            }
          />
        ),
      })
    }

    /*
     * BENEFITS
     */

    if (parsed.benefits) {
      items.push({
        id: "benefits",
        label: "Benefits",
        content: (
          <ProductText
            content={parsed.benefits}
          />
        ),
      })
    }

    /*
     * HOW TO USE
     */

    if (parsed.howToUse) {
      items.push({
        id: "how-to-use",
        label: "How to Use",
        content: (
          <ProductText
            content={
              parsed.howToUse
            }
          />
        ),
      })
    }

    /*
     * SHIPPING
     */

    items.push({
      id: "shipping",
      label: "Shipping & Returns",
      content: (
        <ShippingInfoTab />
      ),
    })

    return items
  }, [
    parsed,
    product,
  ])

  const [activeTab, setActiveTab] =
    useState(
      tabs[0]?.id || "description"
    )

  const activeContent =
    tabs.find(
      (tab) =>
        tab.id === activeTab
    )

  if (!tabs.length) {
    return null
  }

  return (
    <div className="w-full">

      {/* ======================================================
          TAB NAVIGATION
      ====================================================== */}

      <div
        className="
          overflow-x-auto
          border-b
          border-black/[0.08]
          no-scrollbar
        "
      >
        <div
          className="
            flex
            min-w-max
            items-center
            gap-7
            md:gap-9
          "
        >
          {tabs.map(
            (tab) => {
              const active =
                tab.id === activeTab

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  className={`
                    relative
                    shrink-0
                    pb-3
                    pt-1
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[0.15em]
                    transition-colors
                    duration-200
                    ${
                      active
                        ? "text-[#2b2724]"
                        : "text-[#9a9088] hover:text-[#4d4742]"
                    }
                  `}
                >
                  {tab.label}

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-[-1px]
                        left-0
                        right-0
                        h-[1px]
                        bg-[#2b2724]
                      "
                    />
                  )}
                </button>
              )
            }
          )}
        </div>
      </div>

      {/* ======================================================
          ACTIVE TAB CONTENT
      ====================================================== */}

      <div
        key={activeTab}
        className="
          py-7
          md:py-8
        "
      >
        {activeContent?.content}
      </div>
    </div>
  )
}

export default ProductTabs