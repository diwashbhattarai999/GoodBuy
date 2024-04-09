"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { TbPlus, TbMinus } from "react-icons/tb";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import { CustomProductType } from "@/app/(public)/product/[productId]/page";
import Star from "@/components/ui/star";
import Button from "@/components/ui/Button";
import Share from "@/components/ui/share";
import Accordion from "@/components/ui/accordian";
import { ProductDetail } from "@prisma/client";
import { cn } from "@/lib/utils";
// import SimilarSwiper from "../SimilarSwiper";
// TODO: Add share an similar swiper

interface ProductInfosProps {
  product: CustomProductType | undefined;
}

const ProductInfos: React.FC<ProductInfosProps> = ({ product }) => {
  const searchParams = useSearchParams();

  const productSize = searchParams.get("size");
  const style = searchParams.get("style");

  const [getSize, setGetSize] = useState(productSize);
  const [qty, setQty] = useState(1);

  const details: [string, ProductDetail[]] = ["", []];
  if (product?.description) {
    details[0] = product.description;
  }
  if (product?.details) {
    details[1] = product.details;
  }

  useEffect(() => {
    setGetSize("");
    setQty(1);
  }, [style, productSize]);

  return (
    <div className="flex flex-col gap-[5px] flex-1">
      {/* Product Name */}
      <div className="text-xl font-bold text-primary-foreground">
        {product?.name}
      </div>

      {/* SKU */}
      {product?.sku && (
        <h2 className="my-2 font-normal text-muted-foreground">
          SKU: {product?.sku}
        </h2>
      )}

      {/* Rating */}
      <div className="flex flex-wrap items-baseline gap-2 text-lg">
        <Star rating={product?.rating} readonly gap={1} />
        <span className="text-muted-foreground">
          {product?.numReviews}
          {product?.numReviews == 1 ? " review" : " reviews"}
        </span>
      </div>
      <span className="h-[1px] w-full bg-border my-2" />

      {/* Price */}
      <div className="flex flex-wrap items-center gap-2 mt-2 text-lg font-semibold text-primary-foreground">
        {!productSize ? (
          <h2>{product?.priceRange}</h2>
        ) : (
          <h1>Rs. {product?.price}</h1>
        )}
        {product?.discount ? (
          product?.discount > 0 ? (
            <h3 className="text-base text-muted-foreground">
              {productSize && (
                <span className="mr-1 line-through">
                  {product?.priceBefore}$
                </span>
              )}
              <span>(-{product?.discount}%)</span>
            </h3>
          ) : (
            <h3 className="text-base text-muted-foreground">
              <span className="mr-1 line-through">{product?.priceBefore}$</span>
            </h3>
          )
        ) : null}
      </div>

      {/* Shipping & Quantity */}
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Shipping */}
        <div className="text-muted-foreground">
          {product?.shipping
            ? `+Rs. ${product?.shipping}$ Shipping Fee`
            : "Free Shipping"}
        </div>

        {/* Quantity */}
        <div className="text-secondary-foreground">
          {productSize
            ? product?.quantity
            : product?.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available
        </div>
      </div>
      <span className="h-[1px] w-full bg-border my-2" />

      {/* Sizes */}
      <h1 className="mt-2 text-lg font-semibold text-primary-color">Sizes:</h1>
      <div className="flex flex-wrap gap-2 my-2">
        {product?.sizes.map((size, index) => (
          <Link
            key={index}
            href={`/product/${product.slug}?style=${style}&size=${index}`}
          >
            <div
              className={`${
                productSize != null && index == parseFloat(productSize)
                  ? "bg-accent text-accent-foreground"
                  : "bg-border"
              }  py-1 px-4 rounded-sm transition duration-300`}
              onClick={() => setGetSize(size.size)}
            >
              {size.size}
            </div>
          </Link>
        ))}
      </div>

      {/* COLORS */}
      <h1 className="mt-2 text-lg font-semibold text-primary-foreground">
        Colors:
      </h1>
      <div className="flex flex-wrap gap-3 my-2">
        {product?.colors &&
          product.colors.map((color, i) => (
            <span key={i}>
              <Link href={`/product/${product.slug}?style=${i}`}>
                <Image
                  src={color.image}
                  alt="color"
                  width={40}
                  height={40}
                  className={cn(
                    "rounded-full w-[40px] h-[40px] cursor-pointer object-cover shadow-md outline outline-offset-2 outline-[3px] hover:outline-primary-foreground transition-all duration-500",
                    style &&
                      i == parseFloat(style) &&
                      "outline-primary-foreground"
                  )}
                />
              </Link>
            </span>
          ))}
      </div>
      <span className="h-[1px] w-full bg-border my-2" />

      {/* Qty */}
      <h1 className="mt-2 text-lg font-semibold text-primary-color">
        Qunatity:
      </h1>
      <div className="flex mb-2">
        <div className="flex items-center justify-center gap-2 p-1 border rounded-full">
          <Button
            onClick={() =>
              product?.quantity &&
              qty < product?.quantity &&
              setQty((prev) => prev + 1)
            }
            className="rounded-full"
          >
            <TbPlus />
          </Button>
          <span className="my-[2px] px-4 py-1">{qty}</span>
          <Button
            onClick={() => qty > 1 && setQty((prev) => prev - 1)}
            className="rounded-full"
          >
            <TbMinus />
          </Button>
        </div>
      </div>

      {/* actions */}
      <div className="md:hidden max-md:flex flex-wrap gap-4 mt-6">
        <Button full className="flex items-center justify-center gap-4">
          <BsFillCartPlusFill className="w-5 h-5" />
          Add to Cart
        </Button>
        <Button full className="flex items-center justify-center gap-4">
          <AiOutlineHeart className="w-5 h-5" />
          Add to wishlist
        </Button>
      </div>
      <span className="h-[1px] w-full bg-border my-2" />

      {/* Share */}
      <h1 className="my-2 text-lg font-semibold text-primary-color">
        Share with socials:
      </h1>
      <Share />
      <span className="h-[1px] w-full bg-border my-2" />

      {/* Accordian */}
      <Accordion details={details} />
    </div>
  );
};

export default ProductInfos;
