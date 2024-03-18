import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  companyName: string;
  panNo: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
