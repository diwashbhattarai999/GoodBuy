import { UserRole } from "@prisma/client";

import { RoleGate } from "@/components/auth/role-gate";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer/Footer";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate
      allowedRole={[UserRole.USER, UserRole.ADMIN, UserRole.VENDOR]}
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
