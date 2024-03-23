import { getCategories } from "@/data/vendor/category";
import CategoryForm from "../_components/category-form";

const CategoriesPage = async () => {
  const allCategories = await getCategories();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CategoryForm allCategories={allCategories} />
    </div>
  );
};

export default CategoriesPage;
