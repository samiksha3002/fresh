
function parseProductDescription(description: string): DetailTab[] {
  const sections = new Map<string, string[]>()
  const headingPattern =
    /(?:^|\n)\s*(?:#{1,6}\s*)?(description|product description|about the product|key benefits|product benefits|benefits|directions for use|directions|usage instructions|how to apply|how to use|usage|key ingredients|ingredient list|full ingredients|ingredients)\s*:?\s*/gi

  const headingToId: Record<string, string> = {
    description: "description",
    "product description": "description",
    "about the product": "description",
    benefits: "benefits",
    "key benefits": "benefits",
    "product benefits": "benefits",
    "how to use": "how-to-use",
    "directions for use": "how-to-use",
    directions: "how-to-use",
    "usage instructions": "how-to-use",
    "how to apply": "how-to-use",
    usage: "how-to-use",
    ingredients: "ingredients",
    "key ingredients": "ingredients",
    "ingredient list": "ingredients",
    "full ingredients": "ingredients",
  }

  const labels: Record<string, string> = {
    description: "Description",
    benefits: "Benefits",
    "how-to-use": "How to Use",
    ingredients: "Ingredients",
  }

  const matches = Array.from(description.matchAll(headingPattern))

  if (matches.length === 0) {
    return description.trim()
      ? [{ id: "description", label: "Description", content: description.trim() }]
      : []
  }

  // Keep any introductory text before the first heading as Description.
  const firstHeadingStart = matches[0].index ?? 0
  const intro = description.slice(0, firstHeadingStart).trim()

  if (intro) {
    sections.set("description", [intro])
  }

  matches.forEach((match, index) => {
    const headingText = (match[1] || "").trim().toLowerCase()
    const id = headingToId[headingText]
    if (!id) return

    const headingEnd = (match.index ?? 0) + match[0].length
    const nextHeadingStart =
      index + 1 < matches.length
        ? matches[index + 1].index ?? description.length
        : description.length

    const content = description.slice(headingEnd, nextHeadingStart).trim()

    if (content) {
      const existing = sections.get(id) || []
      existing.push(content)
      sections.set(id, existing)
    } else if (!sections.has(id)) {
      sections.set(id, [])
    }
  })

  return Object.keys(labels)
    .filter((id) => (sections.get(id) || []).join("\n\n").trim().length > 0)
    .map((id) => ({
      id,
      label: labels[id],
      content: (sections.get(id) || []).join("\n\n").trim(),
    }))
}
