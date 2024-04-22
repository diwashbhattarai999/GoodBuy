"use client";

import Loader from "@/components/loader";
import {
  TGetProduct,
  TGetProductByCategorySlug,
  TGetProductBySubcategorySlug,
} from "@/data/user/product";

interface IProductsListsProps {
  products: (TGetProduct | null)[] | null;
}

const ProductsLists = ({ products }: IProductsListsProps) => {
  if (!products) {
    return <Loader />;
  }

  return (
    <>
      {products.map((product, i) => {
        if (!product) {
          return <Loader key={i} />;
        }

        return <div key={product.id}>{product.name}</div>;
      })}
    </>
  );
};

export default ProductsLists;
