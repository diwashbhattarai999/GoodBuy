"use client";

import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";

import Button from "@/components/ui/Button";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

interface MainSwiperProps {
  images:
    | {
        url: string;
        public_url: string;
      }[]
    | undefined;
  activeImg?: any;
}

const MainSwiper: React.FC<MainSwiperProps> = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);

  const imgSrc = images ? images[active]?.url : "";

  return (
    <div className="flex flex-col md:sticky top-[4.2rem] left-0 h-full">
      {/* images */}
      <div className="flex flex-col-reverse gap-4 overflow-hidden md:flex-row">
        <div className="flex md:flex-col self-center md:self-start pr-2 md:h-[479px] overflow-auto custom-slider">
          {images?.map((img, index) => (
            <div
              key={img.url}
              className={`
              mb-2 border-2 rounded-md p-[2px] cursor-pointer
              ${
                active === index ? "border-primary-color" : "border-transparent"
              }
              transition duration-300
            `}
              onClick={() => setActive(index)}
            >
              <Image
                src={img.url}
                alt=""
                width={500}
                height={500}
                className="rounded-md w-28 h-28 object-cover"
              />
            </div>
          ))}
        </div>
        <div className="md:w-[360px] md:h-[479px] self-center md:self-start inner-image">
          <InnerImageZoom
            src={imgSrc}
            zoomType="hover"
            zoomPreload={true}
            className="rounded-md w-full h-full"
          />
        </div>
      </div>

      {/* actions */}
      <div className="hidden gap-4 mt-4 md:flex">
        <Button full className="flex items-center justify-center gap-4">
          <BsFillCartPlusFill className="w-5 h-5" />
          Add to Cart
        </Button>
        <Button full className="flex items-center justify-center gap-4">
          <AiOutlineHeart className="w-5 h-5" />
          Add to wishlist
        </Button>
      </div>
    </div>
  );
};

export default MainSwiper;
