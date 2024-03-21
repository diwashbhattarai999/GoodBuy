import SectionHeader from "../section-header";
import Timer from "./timer";

const Todays = () => {
  return (
    <div>
      <div className="my-28 flex items-center max-md:justify-between md:gap-16">
        <SectionHeader label="Today's" />

        {/* Countdown Timer */}
        <div className="flex items-center">
          <Timer date={new Date(2024, 3, 18)} />
        </div>
      </div>
    </div>
  );
};

export default Todays;
