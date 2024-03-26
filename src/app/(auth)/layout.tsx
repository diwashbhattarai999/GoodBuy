import Footer from "@/components/sections/Footer/Footer";
import Navbar from "@/components/sections/Navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <div className="flex-1 mt-[50px]">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
