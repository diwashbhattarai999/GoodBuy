"use client";

import { Product } from "@prisma/client";
import ProductCard from "../../product/product-card/product-card";
import SectionHeader from "./section-header";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CustomProduct } from "@/../product";
import Button from "@/components/ui/Button";
import { LuArrowRight } from "react-icons/lu";

interface ITodaysProps {
  products: CustomProduct[] | null;
}

const Todays = ({ products }: ITodaysProps) => {
  return (
    <div>
      <div className="my-28">
        <SectionHeader label="Today's" subLabel="Flash Deals" showTimer showArrows/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mx-[10px] my-6 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              Icon={BsFillCartPlusFill}
              imgHeight="h-[280px]"
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button
            className="w-56 mt-8 bg-accent/10 hover:bg-accent/15 hover:text-accent text-accent/95"
            icon
          >
            View All Products
            <LuArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todays;
