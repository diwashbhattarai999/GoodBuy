import { cn } from "@/lib/utils";
import Timer from "../../timer/timer";

interface SectionHeaderProps {
  label: string;
  subLabel: string;
  showTimer?: boolean;
}

const SectionHeader = ({ label, subLabel, showTimer }: SectionHeaderProps) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <span className="bg-accent h-10 w-5 rounded-l-md" />
        <h1 className="text-accent font-semibold">{label}</h1>
      </div>
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
    </>
  );
};

export default SectionHeader;
