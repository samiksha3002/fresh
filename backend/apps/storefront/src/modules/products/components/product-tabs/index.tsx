
"use client"

import { HttpTypes } from "@medusajs/types"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { useEffect, useMemo, useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type Tab = {
  id: string
  label: string
  content: React.ReactNode
}

type ParsedSections = {
  description: string
  ingredients: string
  benefits: string
  howToUse: string
}

const SECTION_LABELS = {
  description: "Description",
  benefits: "Benefits",
  "how-to-use": "How to Use",
  ingredients: "Ingredients",
} as const

/**
 * Recognizes headings such as:
 * Description:
 * Benefits:
 * How to use:
 * Ingredients:
 *
 * Supports headings on separate lines or inline after existing text.
 */
function parseProductDescription(
  description?: string | null
): ParsedSections {
  const result: ParsedSections = {
    description: "",
    ingredients: "",
    benefits: "",
    howToUse: "",
  }

  const text = (description || "")
    .replace(/\r\n?/g, "\n")
    .trim()

  if (!text) return result

  const headingAliases: Record<string, keyof ParsedSections> = {
    description: "description",
    "product description": "description",
    "about the product": "description",
    benefits: "benefits",
    "key benefits": "benefits",
    "product benefits": "benefits",
    "how to use": "howToUse",
    "how to apply": "howToUse",
    directions: "howToUse",
    "directions for use": "howToUse",
    usage: "howToUse",
    "usage instructions": "howToUse",
    ingredients: "ingredients",
    "key ingredients": "ingredients",
    "ingredient list": "ingredients",
    "full ingredients": "ingredients",
  }

  const aliases = Object.keys(headingAliases)
    .sort((a, b) => b.length - a.length)
    .map((heading) =>
      heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    )
    .join("|")

  // A heading is recognized when it is on its own line,
  // or when it is explicitly written with a colon.
  const headingRegex = new RegExp(
    `(?:^|\\n)[\\t ]*(?:#{1,6}[\\t ]*)?(${aliases})[\\t ]*:?[\\t ]*(?=\\n|$)|[\\t ]+(${aliases})[\\t ]*:[\\t ]*`,
    "gi"
  )

  const matches = Array.from(text.matchAll(headingRegex))

  if (!matches.length) {
    result.description = text
    return result
  }

  let cursor = 0
  let currentSection: keyof ParsedSections = "description"

  for (const match of matches) {
    const start = match.index ?? 0
    const headingText = (match[1] || match[2] || "")
      .trim()
      .toLowerCase()

    const sectionKey = headingAliases[headingText]
    if (!sectionKey) continue

    // Keep the content before this heading in the previous section.
    const precedingContent = text.slice(cursor, start).trim()

    if (precedingContent) {
      result[currentSection] = [
        result[currentSection],
        precedingContent,
      ]
        .filter(Boolean)
        .join("\n\n")
        .trim()
    }

    currentSection = sectionKey
    cursor = start + match[0].length
  }

  const remaining = text.slice(cursor).trim()

  if (remaining) {
    result[currentSection] = [
      result[currentSection],
      remaining,
    ]
      .filter(Boolean)
      .join("\n\n")
      .trim()
  }

  return result
}

/**
 * Formats paragraphs and bullet points.
 */
const ProductText = ({ content }: { content: string }) => {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)

        const isBulletList = lines.every((line) =>
          /^[-•*]\s*/.test(line)
        )

        if (isBulletList) {
          return (
            <ul
              key={index}
              className="list-disc space-y-2 pl-5 marker:text-[#96745c]"
            >
              {lines.map((line, lineIndex) => (
                <li
                  key={lineIndex}
                  className="text-[14px] leading-7 text-[#625b55] md:text-[15px]"
                >
                  {line.replace(/^[-•*]\s*/, "")}
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p
            key={index}
            className="whitespace-pre-line text-[14px] leading-7 text-[#625b55] md:text-[15px]"
          >
            {block}
          </p>
        )
      })}
    </div>
  )
}

/**
 * Additional product details from Medusa.
 */
const ProductDetails = ({
  product,
}: ProductTabsProps) => {
  const details = [
    { label: "Material", value: product.material },
    { label: "Country of origin", value: product.origin_country },
    { label: "Type", value: product.type?.value },
    {
      label: "Weight",
      value: product.weight ? `${product.weight} g` : null,
    },
    {
      label: "Dimensions",
      value:
        product.length && product.width && product.height
          ? `${product.length}L × ${product.width}W × ${product.height}H`
          : null,
    },
  ].filter((item) => item.value != null && item.value !== "")

  if (!details.length) return null

  return (
    <div className="mt-8 border-t border-black/[0.07] pt-6">
      <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[#9a9088]">
        Product details
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label}>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9088]">
              {detail.label}
            </p>
            <p className="mt-1 text-[14px] text-[#4f4944]">
              {detail.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Shipping and returns tab.
 */
const ShippingInfoTab = () => (
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
          Your package will arrive in 3–5 business days at your
          pickup location or in the comfort of your home.
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
          If your product isn't quite right, we'll help you with
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
          Return your product according to our return policy
          and we'll help make the process simple.
        </p>
      </div>
    </div>
  </div>
)

const ProductTabs = ({ product }: ProductTabsProps) => {
  const parsed = useMemo(
    () => parseProductDescription(product.description),
    [product.description]
  )

  const tabs = useMemo(() => {
    const items: Tab[] = []

    if (parsed.description.trim()) {
      items.push({
        id: "description",
        label: SECTION_LABELS.description,
        content: (
          <div>
            <ProductText content={parsed.description} />
            <ProductDetails product={product} />
          </div>
        ),
      })
    }

    if (parsed.benefits.trim()) {
      items.push({
        id: "benefits",
        label: SECTION_LABELS.benefits,
        content: <ProductText content={parsed.benefits} />,
      })
    }

    if (parsed.howToUse.trim()) {
      items.push({
        id: "how-to-use",
        label: SECTION_LABELS["how-to-use"],
        content: <ProductText content={parsed.howToUse} />,
      })
    }

    if (parsed.ingredients.trim()) {
      items.push({
        id: "ingredients",
        label: SECTION_LABELS.ingredients,
        content: <ProductText content={parsed.ingredients} />,
      })
    }

    items.push({
      id: "shipping",
      label: "Shipping & Returns",
      content: <ShippingInfoTab />,
    })

    return items
  }, [parsed, product])

  const [activeTab, setActiveTab] = useState("description")

  // Keep the selected tab valid when navigating between products.
  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id || "shipping")
    }
  }, [tabs, activeTab])

  const activeContent =
    tabs.find((tab) => tab.id === activeTab) || tabs[0]

  if (!tabs.length) return null

  return (
    <div className="w-full">
      <div className="no-scrollbar overflow-x-auto border-b border-black/[0.08]">
        <div
          role="tablist"
          aria-label="Product information"
          className="flex min-w-max items-center gap-7 md:gap-9"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeContent?.id

            return (
              <button
                key={tab.id}
                id={`product-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`product-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 pb-3 pt-1 text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 md:text-[11px] ${
                  active
                    ? "text-[#2b2724]"
                    : "text-[#9a9088] hover:text-[#4d4742]"
                }`}
              >
                {tab.label}

                {active && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-[#96745c]" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {activeContent && (
        <div
          key={activeContent.id}
          id={`product-panel-${activeContent.id}`}
          role="tabpanel"
          aria-labelledby={`product-tab-${activeContent.id}`}
          className="py-7 md:py-8"
        >
          {activeContent.content}
        </div>
      )}
    </div>
  )
}

export default ProductTabs
