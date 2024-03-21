import MaxWidthContainer from "@/components/max-width-container";
import CategoryForm from "../_components/categories/category-form";

const Categories = () => {
  const categories = [{ name: "Men's Fashion" }];
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CategoryForm categories={categories} />
    </div>
  );
};

export default Categories;
