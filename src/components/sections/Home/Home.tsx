import { Category, SubCategory } from "@prisma/client";
import HeroSection from "./heroSection";
import Todays from "./todays";

interface HomeProps {
  categories: (Category & { subCategories: SubCategory[] | null })[] | undefined;
}

const Home = ({ categories }: HomeProps) => {
  return (
    <>
      <HeroSection categories={categories} />
      <Todays />
      {/* BROWSE BY CATEGORY */}
      {/* BEST SELLING PRODUCT */}
      {/* BUY NOW BANNER WITH TIMER */}
      {/* EXPLORE OUR PRODUCT */}
      {/* NEW ARRIVAL */}
      {/* SERVICES */}
    </>
  );
};

export default Home;
