
"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useMemo, useState } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

type DetailTab = {
  id: string
  label: string
  content: string
}

const SECTION_HEADINGS = [
  {
    id: "description",
    label: "Description",
    aliases: ["description", "product description", "about the product"],
  },
  {
    id: "benefits",
    label: "Benefits",
    aliases: ["benefits", "key benefits", "product benefits"],
  },
  {
    id: "how-to-use",
    label: "How to Use",
    aliases: [
      "how to use",
      "directions for use",
      "directions",
      "usage instructions",
      "how to apply",
      "usage",
    ],
  },
  {
    id: "ingredients",
    label: "Ingredients",
    aliases: [
      "ingredients",
      "key ingredients",
      "ingredient list",
      "full ingredients",
    ],
  },
] as const

function normalizeHeading(line: string) {
  return line
    .trim()
    .replace(/^[#*\s]+|[*\s]+$/g, "")
    .replace(/:\s*$/, "")
    .replace(/^\d+[.)]\s*/, "")
    .trim()
    .toLowerCase()
}

function findSectionHeading(line: string) {
  const normalized = normalizeHeading(line)

  return SECTION_HEADINGS.find((section) =>
    (section.aliases as readonly string[]).includes(normalized)
  )
}

function parseProductDescription(description: string): DetailTab[] {
  const lines = description.split(/\r?\n/)
  const sections = new Map<string, string[]>()

  let currentSection: string | null = null
  let foundHeading = false

  for (const line of lines) {
    const heading = findSectionHeading(line)

    if (heading) {
      foundHeading = true
      currentSection = heading.id

      if (!sections.has(currentSection)) {
        sections.set(currentSection, [])
      }

      continue
    }

    // Keep content before the first recognized heading as general description.
    if (!foundHeading) {
      currentSection = "description"
      if (!sections.has(currentSection)) {
        sections.set(currentSection, [])
      }
    }

    if (currentSection) {
      sections.get(currentSection)!.push(line)
    }
  }

  // If there are no recognized headings, preserve the whole description.
  if (!foundHeading) {
    return description.trim()
      ? [{ id: "description", label: "Description", content: description.trim() }]
      : []
  }

  return SECTION_HEADINGS.map((section) => ({
    id: section.id,
    label: section.label,
    content: (sections.get(section.id) || []).join("\n").trim(),
  })).filter((section) => section.content.length > 0)
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = useMemo(
    () => parseProductDescription(product.description || ""),
    [product.description]
  )

  const activeContent =
    tabs.find((tab) => tab.id === activeTab) || tabs[0]

  return (
    <div id="product-info" className="w-full">
      <div className="mx-auto flex w-full max-w-[620px] flex-col gap-y-5">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-[#8b7865] transition-colors hover:text-[#44372f]"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        <Heading
          level="h1"
          className="text-3xl leading-tight tracking-tight text-[#292522] md:text-4xl"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {tabs.length > 0 && (
          <section className="mt-2 border-t border-[#e9e2da]">
            <div
              role="tablist"
              aria-label="Product details"
              className="flex flex-wrap gap-x-5 border-b border-[#e9e2da]"
            >
              {tabs.map((tab) => {
                const selected = activeContent?.id === tab.id

                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative py-4 text-sm transition-colors ${
                      selected
                        ? "font-medium text-[#44372f] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#9a795b]"
                        : "text-[#898078] hover:text-[#44372f]"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {activeContent && (
              <div
                key={activeContent.id}
                id={`panel-${activeContent.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeContent.id}`}
                className="min-h-[100px] py-5"
              >
                <Text className="whitespace-pre-line text-sm leading-7 text-[#655c54]">
                  {activeContent.content}
                </Text>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
