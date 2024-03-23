import { getCategories } from "@/data/vendor/category";
import SubCategoryForm from "../_components/sub-category-form";
import { getSubcategories } from "@/data/vendor/subCategory";

const SubCategoriesPage = async () => {
  const allCategories = await getCategories();
  const allSubcategories = await getSubcategories();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <SubCategoryForm allCategories={allCategories} allSubCategories={allSubcategories}/>
    </div>
  );
};

export default SubCategoriesPage;
