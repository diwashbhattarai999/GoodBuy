import { getProducts } from "@/data/vendor/products";

import ProductCard from "../_components/product-card";

const ProductsPage = async () => {
  const allProducts = await getProducts();

  return (
    <div className="w-full flex flex-col p-5">
      <h1 className="font-semibold text-xl border-b border-border pb-1">
        All Products
      </h1>
      {allProducts?.map(async (product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductsPage;
