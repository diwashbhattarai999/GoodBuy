import { Category, SubCategory } from "@prisma/client";
import Image from "next/image";
import { LuChevronRight } from "react-icons/lu";
import HeroSwiper from "./hero-swiper";

interface IHeroSectionProps {
  categories:
    | (Category & { subCategories: SubCategory[] | null })[]
    | undefined;
}

const BANNER_IMAGES = [
  {
    url: "/images/banner1.jpg",
  },
  {
    url: "/images/banner2.jpg",
  },
  {
    url: "/images/banner3.jpg",
  },
  {
    url: "/images/banner4.jpg",
  },
];

const HeroSection = ({ categories }: IHeroSectionProps) => {
  return (
    <>
      {/* Categories Section */}
      <div className="flex items-start justify-between gap-6 lg:h-[18rem]">
        <ul className="max-lg:hidden lg:flex flex-col justify-between h-full mt-2">
          {categories?.map((category, index) => {
            return (
              <li
                key={index}
                className="w-full flex gap-4 items-center justify-between cursor-pointer font-medium hover:text-muted-foreground"
              >
                <p>{category.name}</p>
                {category.subCategories &&
                  category.subCategories.length > 0 && (
                    <LuChevronRight className="h-4 w-4 mt-1" />
                  )}
              </li>
            );
          })}
        </ul>

        <div className="max-lg:hidden h-full w-[1px] bg-border mt-2" />

        <HeroSwiper className="lg:w-[80%] w-full">
          {BANNER_IMAGES.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt="Hero-banner"
              width={1000}
              height={1000}
              priority
              className="w-full h-[19rem] object-cover mb-8"
            />
          ))}
        </HeroSwiper>
      </div>

      {/* Slider Hero Banner */}
    </>
  );
};

export default HeroSection;
