import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <div className="flex-1 mt-[62px]">{children}</div>
        <Footer />
      </main>
    </>
  );
}
