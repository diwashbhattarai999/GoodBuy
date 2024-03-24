import Image from "next/image";
import { FooterDataType } from "./footer-data";

interface FooterSectionProps {
  title: string;
  data: FooterDataType[];
}

const FooterSection = ({ title, data }: FooterSectionProps) => {
  return (
    <div className="pb-6 mt-6 border-b lg:border-b-0">
      <h2 className="mb-2 text-xl font-bold uppercase">{title}</h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 ">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 duration-300 cursor-pointer opacity-80 hover:underline hover:opacity-100 w-fit"
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
