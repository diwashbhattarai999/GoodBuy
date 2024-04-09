import { Category, SubCategory } from "@prisma/client";
import SectionHeader from "./section-header";
import {
  FaMale,
  FaFemale,
  FaLaptop,
  FaHome,
  FaMedkit,
  FaFootballBall,
  FaBabyCarriage,
  FaShoppingBasket,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface ICategoriesProps {
  categories:
    | (Category & { subCategories: SubCategory[] | null })[]
    | undefined;
}

const categoryIcons: { [key: string]: IconType } = {
  "Men's Fashion": FaMale,
  "Women's Fashion": FaFemale,
  Electronics: FaLaptop,
  "Home & Lifestyle": FaHome,
  Medicine: FaMedkit,
  "Sports & Outdoor": FaFootballBall,
  "Baby's & Toy": FaBabyCarriage,
  "Groceries & Pets": FaShoppingBasket,
};

const Categories = ({ categories }: ICategoriesProps) => {
  return (
    <div>
      <div className="my-28">
        <SectionHeader label="Categories" subLabel="Browse By Category" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {categories?.map((category) => {
            const Icon = categoryIcons[category.name];
            return (
              <li
                key={category.id}
                className="py-8 border border-secondary-foreground rounded-md cursor-pointer text-primary-foreground hover:bg-accent hover:text-accent-foreground duration-300 flex flex-col items-center gap-2 hover:scale-110"
              >
                <Icon className="w-10 h-10" />
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
