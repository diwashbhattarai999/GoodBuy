"use client";

import { Product } from "@prisma/client";
import ProductCard from "../../product/product-card/product-card";
import SectionHeader from "./section-header";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CustomProduct } from "@/../product";

interface ITodaysProps {
  products: CustomProduct[] | null;
}

const Todays = ({ products }: ITodaysProps) => {
  return (
    <div>
      <div className="my-28">
        <SectionHeader label="Today's" subLabel="Flash Deals" showTimer />
        <div className="flex flex-wrap items-stretch -mx-[10px] my-6 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              Icon={BsFillCartPlusFill}
              imgHeight="h-[280px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todays;
