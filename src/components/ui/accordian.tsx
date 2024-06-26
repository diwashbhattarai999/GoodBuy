import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { ProductDetail } from "@prisma/client";

interface AccordianProps {
  details?: [string, ProductDetail[]];
}

interface AccordianSectionProps extends AccordianProps {
  title: string;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const AccordianSection: React.FC<AccordianSectionProps> = ({
  isOpen,
  toggleAccordion,
  title,
  details,
}) => {
  return (
    <div className="flex flex-col">
      <div className="pt-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <h1 className="text-base sm:text-lg md:text-xl font-semibold md:font-bold text-primary-color">
            {title}
          </h1>
          <IoIosArrowDown
            size={20}
            className={`${
              isOpen ? "transform rotate-180" : ""
            } transition-transform duration-500 ease-in-out`}
          />
        </div>
      </div>

      <span
        className={`${
          isOpen ? "h-[1px] " : "h-0"
        } w-full bg-slate-300 my-2 block transition-all duration-500 ease-in-out`}
      />

      <div
        className={`${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } pb-2 transition-all duration-700 ease-in-out overflow-hidden`}
      >
        {details && (
          <>
            <h1 className="text-sm sm:text-base md:text-lg font-semibold">
              {details[0]}
            </h1>
            <span className="h-[1px] w-full bg-slate-200 my-2 block" />
          </>
        )}
        <ul className="max-w-[400px] text-xs sm:text-sm md:text-base">
          {details &&
            details[1].map((detail) => (
              <li
                key={detail.id}
                className="flex flex-wrap gap-2 justify-between items-center my-1"
              >
                <span className="font-semibold">{detail.name}: </span>
                <span className="w-[130px] md:w-fit lg:w-[180px]">
                  {detail.value}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordianProps> = ({ details }) => {
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  const handleAccordionToggle = (title: string) => {
    if (accordionOpen === title) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(title);
    }
  };

  return (
    <>
      <AccordianSection
        title="Specifications"
        details={details}
        isOpen={accordionOpen === "Specifications"}
        toggleAccordion={() => handleAccordionToggle("Specifications")}
      />
      <span className="h-[1px] w-full bg-gray-100" />
      <AccordianSection
        title="Size & Fit"
        isOpen={accordionOpen === "Size & Fit"}
        toggleAccordion={() => handleAccordionToggle("Size & Fit")}
      />
    </>
  );
};

export default Accordion;
