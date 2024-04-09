import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import { cn } from "@/lib/utils";
import Timer from "../../timer/timer";

interface SectionHeaderProps {
  label: string;
  subLabel: string;
  showTimer?: boolean;
  showArrows?: boolean;
}

const SectionHeader = ({
  label,
  subLabel,
  showTimer,
  showArrows,
}: SectionHeaderProps) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <span className="bg-accent h-10 w-5 rounded-l-md" />
        <h1 className="text-accent font-semibold">{label}</h1>
      </div>
      <div className="flex items-end justify-between gap-4">
        {/* Flash Deals */}
        <div
          className={cn(
            "flex items-center max-md:justify-between md:gap-16",
            showTimer ? "mt-6" : "mt-8"
          )}
        >
          <h3 className="font-bold text-2xl">{subLabel}</h3>
          {showTimer && <Timer date={new Date(2024, 3, 18)} />}
        </div>
        {showArrows && (
          <div className="flex gap-6 items-center justify-center">
            <FiArrowLeftCircle className="w-7 h-7" />
            <FiArrowRightCircle className="w-7 h-7" />
          </div>
        )}
      </div>
    </>
  );
};

export default SectionHeader;
