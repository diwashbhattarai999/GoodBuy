import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 backdrop-blur-sm h-screen w-full bg-foreground/5 flex items-center justify-center z-50">
      <ScaleLoader color="#282f2b" />
    </div>
  );
};

export default Loader;
