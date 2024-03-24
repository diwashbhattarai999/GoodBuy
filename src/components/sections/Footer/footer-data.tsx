import { LuFacebook, LuInstagram, LuMail, LuTwitter } from "react-icons/lu";

export type FooterDataType = {
  title: string;
  link: string;
  icon?: any;
};

export const PRODUCT_CATEGORIES: FooterDataType[] = [
  {
    title: "Men's Fashion",
    link: "",
  },
  {
    title: "Women's Fashion",
    link: "",
  },
  {
    title: "Electronics",
    link: "",
  },
  {
    title: "Home's & Lifestyle",
    link: "",
  },
  {
    title: "Medicine",
    link: "",
  },
  {
    title: "Sports & Outdoor",
    link: "",
  },
  {
    title: "Baby's & Toys",
    link: "",
  },
  {
    title: "Groceries & Pets",
    link: "",
  },
  {
    title: "Health & Beauty",
    link: "",
  },
];

export const POPULAR_CATEGORIES: FooterDataType[] = [
  {
    title: "Men's Fashion",
    link: "",
  },
  {
    title: "Women's Fashion",
    link: "",
  },
  {
    title: "Electronics",
    link: "",
  },
  {
    title: "Health & Beauties",
    link: "",
  },
  {
    title: "Groceries & Pets",
    link: "",
  },
];

export const INFORMATION: FooterDataType[] = [
  {
    title: "About Us",
    link: "",
  },
  {
    title: "FAQ",
    link: "",
  },
  {
    title: "Help",
    link: "",
  },
  {
    title: "Shipping and return policy",
    link: "",
  },
];

export const SOCIALS: FooterDataType[] = [
  {
    title: "Instagram",
    link: "",
    icon: LuInstagram,
  },
  {
    title: "Facebook",
    link: "",
    icon: LuFacebook,
  },
  {
    title: "Twitter",
    link: "",
    icon: LuTwitter,
  },
  {
    title: "Gmail",
    link: "",
    icon: LuMail,
  },
];
