import AnimationWrapper from "@/components/animations/page-animation";
import MaxWidthContainer from "@/components/max-width-container";
import BreadCrumbs from "@/components/product/bread-crumbs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GiDoughRoller } from "react-icons/gi";
import { LuDollarSign, LuShoppingBag, LuStore } from "react-icons/lu";
import { FaTruckFast, FaHeadphones } from "react-icons/fa6";
import { SiAdguard } from "react-icons/si";
import Carousel from "@/components/swiper";

const ABOUT_INFOS = [
  {
    icon: LuStore,
    number: "10.5K",
    desc: "Sellers active on our platform",
  },
  {
    icon: LuDollarSign,
    number: "33K",
    desc: "Monthly Product Sales",
  },
  {
    icon: LuShoppingBag,
    number: "45.5K",
    desc: "Active Customers on our platform",
  },
  {
    icon: GiDoughRoller,
    number: "25K",
    desc: "Annual Gross Sales on our platform",
  },
];

const ABOUT_SERVICES = [
  {
    icon: FaTruckFast,
    title: "Free and Fast Delivery",
    subtitle: "Free delivery for all orders over Rs. 999",
  },
  {
    icon: FaHeadphones,
    title: "24/7 Customer Service",
    subtitle: "Freindly 24/7 customer support",
  },
  {
    icon: SiAdguard,
    title: "Money back guarentee",
    subtitle: "We return money within 30 days",
  },
];

const ABOUT_TEAMS = [
  {
    image: "/images/team1.jpg",
    name: "Alice Johnson",
    position: " Senior Software Engineer",
  },
  {
    image: "/images/team2.jpg",
    name: "David Smith",
    position: "Data Scientist",
  },
  {
    image: "/images/team3.jpg",
    name: "Sarah Patel",
    position: "Product Manager",
  },
  {
    image: "/images/team1.jpg",
    name: "Alice Johnson",
    position: " Senior Software Engineer",
  },
  {
    image: "/images/team2.jpg",
    name: "David Smith",
    position: "Data Scientist",
  },
  {
    image: "/images/team3.jpg",
    name: "Sarah Patel",
    position: "Product Manager",
  },
];

const AboutPage = () => {
  return (
    <AnimationWrapper>
      <MaxWidthContainer className="mt-5">
        {/* Hero section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-[55%]">
            <h1 className="mb-8 text-4xl lg:text-5xl font-bold text-foreground">
              Welcome to Good Buy
            </h1>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              {` Good Buy is not just another online marketplace; it's an ecosystem
              designed to revolutionize the way you shop and sell online. We
              bring together buyers and sellers from all over the world,
              offering a vast array of products and services to meet every need
              and desire.`}
            </p>
            <p className="mb-3 text-sm font-medium text-secondary-foreground">
              {`At Good Buy, we prioritize user experience, ensuring that both
              buyers and sellers have a seamless and enjoyable experience on our
              platform. Whether you're looking for the latest fashion trends,
              electronics, home decor, or anything in between, you'll find it
              all at Good Buy.`}
            </p>
          </div>

          <div className="w-full md:w-[45%] md:max-w-[36rem] h-[32rem]">
            <Image
              src="/images/about.jpg"
              alt="About"
              className="h-full w-full object-contain"
              width={500}
              height={500}
            />
          </div>
        </div>
        {/* Info */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-24 my-16 text-center">
          {ABOUT_INFOS.map((info, index) => (
            <div
              key={index}
              className={cn(
                "border border-border flex flex-col gap-3 p-4 items-center justify-center rounded-md group hover:bg-accent/80 shadow-sm hover:shadow-md cursor-pointer duration-300",
                index === 1 && "bg-accent/80 shadow-md"
              )}
            >
              <div
                className={cn(
                  "ring-secondary-foreground/60 ring-8 bg-foreground text-primary rounded-full flex items-center justify-center p-2 group-hover:bg-background group-hover:ring-secondary-foreground/30 group-hover:text-primary-foreground mt-2",
                  index === 1 &&
                    "bg-background ring-secondary-foreground/30 text-primary-foreground"
                )}
              >
                <info.icon className="rounded-full size-7 p-1" />
              </div>
              <h2
                className={cn(
                  "text-xl font-semibold text-foreground group-hover:text-background",
                  index === 1 && "text-background"
                )}
              >
                {info.number}
              </h2>
              <p
                className={cn(
                  "text-sm text-secondary-foreground group-hover:text-secondary",
                  index === 1 && "text-secondary"
                )}
              >
                {info.desc}
              </p>
            </div>
          ))}
        </div>
        {/* Teams */}
        <div className="my-24">
          <h2 className="text-primary-foreground font-bold text-3xl mb-8">
            Our <span className="text-accent">Teams</span>
          </h2>
          <Carousel className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-24 text-center ">
            {ABOUT_TEAMS.map((team, index) => (
              <div
                key={index}
                className="border border-border flex flex-col gap-3 rounded-md shadow-sm py-6 mb-12"
              >
                <Image
                  src={team.image}
                  alt={team.name}
                  className="min-w-full h-[32rem] object-cover object-top mx-auto"
                  width={500}
                  height={500}
                />
                <div className="h-fit">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {team.name}
                  </h2>
                  <p className="text-base text-secondary-foreground">
                    {team.position}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-24 my-16 text-center">
          {ABOUT_SERVICES.map((info, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-4 items-center justify-center rounded-md"
            >
              <div className="ring-secondary-foreground/60 ring-8 bg-foreground text-primary rounded-full flex items-center justify-center p-2 mt-2">
                <info.icon className="rounded-full size-7 p-1" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {info.title}
              </h2>
              <p className="text-sm text-secondary-foreground">
                {info.subtitle}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthContainer>
    </AnimationWrapper>
  );
};

export default AboutPage;
