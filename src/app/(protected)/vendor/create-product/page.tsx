import { getProductsNameAndSubProducts } from "@/data/vendor/products";
import CreateProductForm from "../_components/create-product-form";
import { getCategories } from "@/data/vendor/category";

const CategoriesPage = async () => {
  const parentsData = await getProductsNameAndSubProducts();
  const categories = await getCategories();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CreateProductForm parentsData={parentsData} categories={categories} />
    </div>
  );
};

export default CategoriesPage;
