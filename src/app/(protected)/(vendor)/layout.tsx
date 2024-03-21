import { UserRole } from "@prisma/client";

import { RoleGate } from "@/components/auth/role-gate";
import LayoutWrapper from "./vendor/layout-wrapper";

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate
      allowedRole={[UserRole.VENDOR]}
      backButtonHref="/"
      backButtonLabel="Go to Home"
    >
      <main className="min-h-screen md:flex md:gap-4 relative">
        <LayoutWrapper>{children}</LayoutWrapper>
      </main>
    </RoleGate>
  );
}
