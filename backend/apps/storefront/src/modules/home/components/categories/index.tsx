
import { listCategories } from "@lib/data/categories"
import HomeCategoriesClient from "./categories-client"

const HOME_CATEGORY_ORDER = [
  {
    key: "acne",
    aliases: ["acne"],
  },
  {
    key: "aging",
    aliases: ["aging", "antiaging", "antiageing"],
  },
  {
    key: "oily-skin",
    aliases: ["oilyskin", "oilyskins"],
  },
  {
    key: "sensitive-skin-barrier-repair",
    aliases: [
      "sensitiveskinbarrierrepair",
      "sensitiveskin",
      "barrierrepair",
    ],
  },
  {
    key: "body-pigmentation",
    aliases: ["bodypigmentation"],
  },
  {
    key: "large-pores-texture",
    aliases: ["largeporestexture", "largepores", "skintexture"],
  },
]

const normalize = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "")

const HomeCategories = async () => {
  const categories = await listCategories({ limit: 100 })

  // Display only the six selected categories, in our preferred order.
  // Backend categories and product relationships remain unchanged.
  const selectedCategories = HOME_CATEGORY_ORDER.flatMap((item) => {
    const match = categories.find((category) => {
      const name = normalize(category.name)
      const handle = normalize(category.handle)

      return item.aliases.some(
        (alias) => name === alias || handle === alias
      )
    })

    return match ? [match] : []
  })

  console.log(
    "[Kovea Touch] Homepage categories:",
    selectedCategories.map(({ name, handle }) => ({ name, handle }))
  )

  return <HomeCategoriesClient categories={selectedCategories} />
}

export default HomeCategories
