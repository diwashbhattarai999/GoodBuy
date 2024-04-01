import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import Home from "@/components/sections/Home/Home";
import { getCategories } from "@/data/vendor/category";
import { getSubCategoriesByCategoryId } from "@/data/vendor/subCategory";

export default async function HomePage() {
  // Fetch categories
  const categories = await getCategories();
  let newCategories;

  if (categories) {
    // Fetch subcategories for each category concurrently
    const subcategoriesPromises = categories.map(async (category) => {
      const subCategoriesByCategory = await getSubCategoriesByCategoryId(
        category.id
      );
      return {
        ...category,
        subCategories: subCategoriesByCategory,
      };
    });

    // Wait for all subcategory fetching promises to resolve
    newCategories = await Promise.all(subcategoriesPromises);
  }

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Home categories={newCategories} />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
