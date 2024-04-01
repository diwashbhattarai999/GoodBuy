"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import { useEffect, useRef } from "react";

interface HeroSwiperProps {
  children: React.ReactNode[];
  className?: string;
}

const HeroSwiper = ({ children, className }: HeroSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    const handleMouseEnter = () => {
      if (swiperInstance) {
        swiperInstance.autoplay.stop();
      }
    };

    const handleMouseLeave = () => {
      if (swiperInstance) {
        swiperInstance.autoplay.start();
      }
    };

    const container = swiperInstance?.el;
    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [swiperRef]);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Pagination, Autoplay, Keyboard]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true, dynamicBullets: true }}
      keyboard={{ enabled: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className={className}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSwiper;
