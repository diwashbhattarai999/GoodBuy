import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  productPrefix,
  publicRoutes,
} from "@/routes";
import { currentUser } from "./lib/auth";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const user = await currentUser();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdmin = nextUrl.pathname == "/admin";
  const isVendor = nextUrl.pathname == "/vendor";
  const isProductRoute = nextUrl.pathname.startsWith(productPrefix);

  if (isApiAuthRoute) return;

  if (isProductRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  if (isLoggedIn && isAdmin) {
    return Response.redirect(new URL("/admin/dashboard", nextUrl));
  }

  // if (isLoggedIn && user?.role !== UserRole.VENDOR) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }

  if (isLoggedIn && isVendor) {
    return Response.redirect(new URL("/vendor/dashboard", nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
