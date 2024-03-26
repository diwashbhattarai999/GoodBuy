"use client";

import Image from "next/image";
import Link from "next/link";
import { LuEye, LuFileEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import { CustomProduct } from "@/../product";

interface ProductCardProps {
  product: CustomProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log(product);

  return (
    <div className="my-5 border shadow-md p-2 flex flex-col gap-1">
      <h1 className="font-medium">{product.name}</h1>
      <p>
        <span className="font-medium">Brand:</span> {product.brand}
      </p>
      <p>
        <span className="font-medium">Category:</span> {product.category.name}
      </p>
      <p>
        <span className="font-medium">Subcategory:</span>{" "}
        {product.subCategories.map((subcategory) => subcategory.name).join(",")}
      </p>

      <div>
        <p className="font-medium my-2">Images:</p>
        <ul className="flex gap-4 items-center justify-start overflow-x-scroll no-scrollbar">
          {product.subProducts.map((subproduct, index) => {
            return (
              <li
                key={subproduct.images[0].id}
                className="bg-primary rounded-md"
              >
                <Image
                  src={subproduct.images[0].url}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="max-w-64 w-full rounded-t-md"
                />
                <div className="flex py-4 items-center justify-evenly text-xl">
                  <Link href={`/vendor/product/${product.id}`}>
                    <LuFileEdit className="text-foreground" />
                  </Link>
                  <Link href={`/product/${product.slug}?style=${index}`}>
                    <LuEye className="text-muted-foreground" />
                  </Link>
                  <Link href={`/vendor/product/${product.id}`}>
                    <RiDeleteBin6Line className="text-accent" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
