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
import Loader from "@/components/loader";
import { ScaleLoader } from "react-spinners";

interface NewProductCardProps {
  product: CustomProduct;
  Icon?: IconType;
  imgHeight?: string;
}

const ProductCard = ({ product, Icon, imgHeight }: NewProductCardProps) => {
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

  const { loadingItems, addToCart } = useCart();

  const handleWishList = () => {
    setHeartActive((prev) => !prev);
  };

  let discountAmt = product?.subProducts[active]?.discount;

  const productName =
    product?.name.length > 45
      ? `${product?.name.substring(0, 54)}...`
      : product?.name;

  const productPrice = prices
    ? prices?.length === 1
      ? `Rs. ${prices[0]}`
      : `Rs. ${prices[0]} - Rs. ${prices[prices.length - 1]}`
    : null;

  return (
    <>
      <div className="w-full shadow-sm rounded-md border border-border hover:border-secondary-foreground/60 relative h-full text-center duration-300 hover:scale-[1.01]">
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
              className="fill-stone-200 absolute inset-0"
            />
            <AiFillHeart
              size={28}
              className={`${heartActive ? "fill-red-600" : "fill-white"}`}
            />
          </div>
          {/* --------------- SAVEUPTO --------------- */}
          {discountAmt > 0 && (
            <div className="text-accent-foreground font-semibold text-base text-left bg-accent/80 backdrop-blur-sm py-[6px] px-4 w-full absolute bottom-0 z-10">
              <span>Discount upto Rs. {discountAmt}</span>
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="text-left text-primary-color relative bg-muted rounded-md">
          <div className="p-4">
            <Link href={`/product/${product?.slug}?style=${active}`}>
              <div className="mb-2 text-lg font-normal block cursor-pointer h-[56px] text-ellipsis line-clamp-2">
                {productName}
              </div>
            </Link>
            <div className="mb-5">
              <span className="text-lg">{productPrice}</span>
            </div>

            {/* STYLE SELECT OPTION */}
            <div className="flex gap-2 mb-4">
              {styles &&
                styles.map((style, i) =>
                  style.image ? (
                    <Image
                      key={i}
                      src={style.image}
                      alt=""
                      width={30}
                      height={30}
                      className={`
                      rounded-full w-[30px] h-[30px] cursor-pointer
                      object-cover shadow-md 
                      outline-offset-2 outline hover:outline-primary-color
                      transition-all duration-500
                      ${i == active && "outline-primary-color"} 
                    `}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                    />
                  ) : (
                    <span
                      key={i}
                      className={`
                    bg-white 
                    w-[30px] h-[30px] rounded-full
                    shadow-md overflow-hidden
                  `}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                    ></span>
                  )
                )}
            </div>

            <Button
              full
              icon
              className="bg-accent text-accent-foreground hover:bg-accent/95"
              onClick={() => addToCart(product?.subProducts[active]?.id)}
            >
              {loadingItems.includes(product?.subProducts[active]?.id) ? (
                <ScaleLoader color="#ffffff" width={15} height={15} />
              ) : (
                <>
                  {Icon && <Icon />}
                  Add To Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
