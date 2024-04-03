"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import Button from "@/components/ui/Button";
import ProductSwiper from "./product-swiper";
import { CustomProduct } from "@/../product";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart.context";

interface NewProductCardProps {
  product: CustomProduct;
  w_full?: boolean;
  Icon?: IconType;
  imgHeight?: string;
}

const ProductCard = ({
  product,
  w_full,
  Icon,
  imgHeight,
}: NewProductCardProps) => {
  const [heartActive, setHeartActive] = useState(false);
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product?.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product?.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [styles, setStyles] = useState(
    product?.subProducts.map((p) => {
      return p.color;
    })
  );

  useEffect(() => {
    setImages(product?.subProducts[active]?.images);
    setPrices(
      product?.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active, product?.subProducts]);

  const { addToCart } = useCart();

  const handleWishList = () => {
    setHeartActive((prev) => !prev);
  };

  let discountAmt = 5;

  const productName =
    product?.name.length > 45
      ? `${product?.name.substring(0, 42)}...`
      : product?.name;

  const productPrice = prices
    ? prices?.length === 1
      ? `Rs. ${prices[0]}`
      : `Rs. ${prices[0]} - Rs. ${prices[prices.length - 1]}`
    : null;

  return (
    <div
      className={cn(
        "w-full shadow-sm rounded-md border border-border/40",
        !w_full && "sm:w-1/2 md:w-1/3 lg:w-1/4"
      )}
    >
      <div className="relative h-full text-center transition-all duration-1000 ease-in-out">
        <div className="min-h-0 relative overflow-hidden">
          {/* --------------- IMAGE --------------- */}
          <Link
            href={`/product/${product?.slug}?style=${active}`}
            className="z-0"
          >
            <ProductSwiper images={images} imgHeight={imgHeight} />
          </Link>
          {/* --------------- WISHLIST --------------- */}
          <div
            className="absolute top-2 right-2 cursor-pointer z-10"
            onClick={handleWishList}
          >
            <AiOutlineHeart
              size={28}
              className={`fill-gray-400 absolute inset-0 `}
            />
            <AiFillHeart
              size={28}
              className={`${heartActive ? "fill-red-600" : "fill-white"}`}
            />
          </div>
          {/* --------------- SAVEUPTO --------------- */}
          {discountAmt > 0 && (
            <div className="text-red-700 font-semibold text-base text-left bg-[#cdb9fa] py-[6px] px-4 w-full absolute bottom-0 z-10">
              <span>Discount upto Rs. {discountAmt}</span>
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="text-left text-primary-color relative bg-muted">
          <div className="p-4">
            <Link href={`/product/${product?.slug}?style=${active}`}>
              <div className="mb-2 text-lg font-normal block cursor-pointer h-[56px]">
                {productName}
              </div>
            </Link>
            <div className="mb-5">
              <span className="text-lg">{productPrice}</span>
              {/* <s className="text-sm text-gray-color">Rs 423</s> */}
            </div>
            <Button
              full
              icon
              className="bg-accent text-accent-foreground hover:bg-accent/95"
              onClick={() => addToCart(product.id)}
            >
              {Icon && <Icon />}
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
