import { listCategories } from "@lib/data/categories"
import HomeCategoriesClient from "./categories-client"

const HomeCategories = async () => {
  const categories = await listCategories({
    limit: 100,
  })

  return <HomeCategoriesClient categories={categories} />
}

export default HomeCategories