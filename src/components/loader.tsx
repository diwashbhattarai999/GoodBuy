import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 backdrop-blur-sm h-screen w-full bg-foreground/5 flex items-center justify-center">
      <ScaleLoader color="#178731" />
    </div>
  );
};

export default Loader;
