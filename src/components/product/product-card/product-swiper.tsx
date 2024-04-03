"use client";

//Import Swiper React Components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

//Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//Import required modules
import { Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface ProductSwiperProps {
  images: {
    url: string;
    public_url: string;
  }[];
  imgHeight?: string;
}

const ProductSwiper = ({ images, imgHeight }: ProductSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    swiperRef.current?.swiper.autoplay.stop();
  }, [swiperRef]);

  return (
    <div
      onMouseEnter={() => {
        swiperRef.current?.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current?.swiper.autoplay.stop();
        swiperRef.current?.swiper.slideTo(0);
      }}
      className={`${imgHeight}`}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
        spaceBetween={1}
      >
        {images?.map((img) => (
          <SwiperSlide key={img.url}>
            <Image
              src={img.url}
              alt="Product"
              width="200"
              height="200"
              className="h-[250px] w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
