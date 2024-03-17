import { UserRole } from "@prisma/client";

import { RoleGate } from "@/components/auth/role-gate";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate
      allowedRole={[UserRole.USER, UserRole.ADMIN]}
      backButtonHref="/"
      backButtonLabel="Go to Home"
    >
      <Navbar showNavBanner />
      <main className="flex flex-col min-h-screen">
        <div className="flex-1 mt-[150px]">{children}</div>
      </main>
      <Footer />
    </RoleGate>
  );
}
