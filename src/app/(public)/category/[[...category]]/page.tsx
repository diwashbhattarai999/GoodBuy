import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import Breadcrumbs from "@/components/product/bread-crumbs";
import ProductsLists from "@/components/sections/categories/products-lists";
import {
  TGetProduct,
  getAllProducts,
  getProductByCategorySlug,
  getProductBySubcategorySlug,
} from "@/data/user/product";

interface PageParams {
  params: {
    category: string;
  };
}

export default async function CategoriesPage({ params }: PageParams) {
  const category = params.category?.[0];
  const subCategory = params.category?.[1];

  let products: (TGetProduct | null)[] | null = [];

  if (!category && !subCategory) {
    products = await getAllProducts();
  }

  if (category && !subCategory) {
    products = await getProductByCategorySlug(category);
  }

  if (category && subCategory) {
    products = await getProductBySubcategorySlug(subCategory);
  }

  return (
    <AnimationWrapper>
      <MaxWidthContainer>
        <Breadcrumbs
          activeClasses="text-accent"
          containerClasses="flex py-5"
          listClasses="hover:underline font-bold"
          capitalizeLinks
        />
        <ProductsLists products={products} />
      </MaxWidthContainer>
    </AnimationWrapper>
  );
}
