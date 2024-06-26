"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuLogOut, LuPlusCircle } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { HiMiniTicket } from "react-icons/hi2";

import { logout } from "@/actions/logout";

import { SIDEBAR_LINKS } from "./constants";

import { cn } from "@/lib/utils";
import { ExpandContext } from "../layout-wrapper";

import { useCurrentUser } from "@/hooks/use-current-user";

import MotionSidebar from "@/components/animations/motion-sidebar";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname().split("/")[2];

  const { expandSidebar, setExpandSidebar, profileOpen, setProfileOpen } =
    useContext(ExpandContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setExpandSidebar(false);
    }
  }, [windowWidth, setExpandSidebar]);

  const handleLogout = () => {
    logout();
  };

  const user = useCurrentUser();

  return (
    <div
      className={cn(
        "bg-primary/70 backdrop-blur-md border-b border-b-border md:border-r md:border-r-border shadow-md md:rounded-r-2xl h-fit md:h-screen md:overflow-y-scroll no-scrollbar p-5 md:pl-8 md:pr-4 md:py-10 md:transition-all md:duration-500 flex md:flex-col items-center md:items-start justify-between z-20 left-0 w-full sticky top-0 md:bottom-0",
        expandSidebar ? "md:min-w-[280px] md:w-[280px]" : "md:min-w-28 md:w-28"
      )}
    >
      {/* Logo */}
      <div className="w-full md:mb-5">
        <Link href="/vendor" className="font-bold text-3xl text-foreground">
          {expandSidebar ? (
            <>
              Good
              <span className="text-accent transition">Buy</span>
            </>
          ) : (
            <>
              G<span className="text-accent transition">B</span>
            </>
          )}
        </Link>
      </div>

      {/* Vendor Links */}
      <div className="hidden md:flex items-start w-full flex-col gap-6 py-4">
        <div className="flex flex-col gap-1 justify-between items-center">
          {SIDEBAR_LINKS.map((link) => {
            return (
              <Link
                key={link.href}
                onClick={() => setProfileOpen(false)}
                href={`/vendor/${link.href}`}
                className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-secondary-foreground"
                }`}
              >
                <link.icon className="py-3 w-auto h-11" />
                {expandSidebar && (
                  <div
                    className={cn(
                      "text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem]",
                      pathname === link.href &&
                        "bg-accent/95 text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 justify-between flex-1 items-center">
          <div className="border-b border-foreground/50 pb-4 flex flex-col gap-1">
            {expandSidebar && (
              <div className="text-lg font-semibold w-full cursor-default">
                Products
              </div>
            )}
            {/* Products */}
            <Link
              href={`/vendor/products`}
              className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                pathname === "products"
                  ? "text-accent"
                  : "text-secondary-foreground"
              }`}
              onClick={() => setProfileOpen(false)}
            >
              <FaBoxOpen className="py-3 w-auto h-11" />
              {expandSidebar && (
                <div
                  className={`text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem] ${
                    pathname === "products" &&
                    "bg-accent/95 text-accent-foreground"
                  }`}
                >
                  Products
                </div>
              )}
            </Link>

            {/* Create-Products */}
            <Link
              href={`/vendor/create-product`}
              className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                pathname === "create-product"
                  ? "text-accent"
                  : "text-secondary-foreground"
              }`}
              onClick={() => setProfileOpen(false)}
            >
              <LuPlusCircle className="py-3 w-auto h-11" />
              {expandSidebar && (
                <div
                  className={`text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem] ${
                    pathname === "create-product" &&
                    "bg-accent/95 text-accent-foreground"
                  }`}
                >
                  Create Product
                </div>
              )}
            </Link>
          </div>

          <div className="border-b border-foreground/50 pb-4 flex flex-col gap-1">
            {expandSidebar && (
              <div className="text-lg font-semibold w-full cursor-default">
                Categories / Subs
              </div>
            )}
            <Link
              href={`/vendor/categories`}
              className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                pathname === "categories"
                  ? "text-accent"
                  : "text-secondary-foreground"
              }`}
              onClick={() => setProfileOpen(false)}
            >
              <MdOutlineCategory className="py-3 w-auto h-11" />
              {expandSidebar && (
                <div
                  className={`text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem] ${
                    pathname === "categories" &&
                    "bg-accent/95 text-accent-foreground"
                  }`}
                >
                  Categories
                </div>
              )}
            </Link>

            <Link
              href={`/vendor/sub-categories`}
              className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                pathname === "sub-categories"
                  ? "text-accent"
                  : "text-secondary-foreground"
              }`}
              onClick={() => setProfileOpen(false)}
            >
              <MdOutlineCategory className="py-3 w-auto h-11 rotate-180" />
              {expandSidebar && (
                <div
                  className={`text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem] ${
                    pathname === "sub-categories" &&
                    "bg-accent/95 text-accent-foreground"
                  }`}
                >
                  SubCategories
                </div>
              )}
            </Link>
          </div>

          <div className="pb-4 flex flex-col gap-1">
            {expandSidebar && (
              <div className="text-lg font-semibold w-full cursor-default">
                Coupens
              </div>
            )}
            <Link
              href={`/vendor/coupens`}
              className={`flex items-center gap-6 font-semibold text-lg transition-colors hover:text-accent ${
                pathname === "coupens"
                  ? "text-accent"
                  : "text-secondary-foreground"
              }`}
              onClick={() => setProfileOpen(false)}
            >
              <HiMiniTicket className="py-3 w-auto h-11" />
              {expandSidebar && (
                <div
                  className={`text-sm rounded-md p-3 hover:bg-accent/95 hover:text-primary transition-colors w-[8.5rem] ${
                    pathname === "coupens" &&
                    "bg-accent/95 text-accent-foreground"
                  }`}
                >
                  Coupens
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="md:w-full group relative">
        <div className="w-full flex items-center gap-2 ">
          <Image
            src={user?.image || "/images/default-profile.webp"}
            alt="profile"
            width={100}
            height={100}
            className="h-9 w-9 rounded-full group-hover:opacity-70 cursor-pointer"
            onClick={() => setProfileOpen((currValue) => !currValue)}
          />
          {expandSidebar && (
            <h3 className="px-2 py-3 rounded-md font-medium text-secondary-foreground max-md:hidden">
              @{user?.email?.split("@")[0]}
            </h3>
          )}
          {profileOpen && (
            <MotionSidebar className="absolute z-50 max-md:top-10 max-md:right-0 md:bottom-14 md:left-0 bg-popover border shadow-md rounded-md py-1 md:py-2 px-2 w-[14rem] md:w-[10rem] text-primary-foreground">
              <div className="flex flex-col">
                <div className="max-md:flex hidden flex-col">
                  {SIDEBAR_LINKS.map((link) => {
                    return (
                      <Link
                        key={link.href}
                        href={`/vendor/${link.href}`}
                        onClick={() => setProfileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                          pathname === link.href && "text-foreground"
                        )}
                      >
                        <link.icon className="py-3 w-auto h-11" />
                        <p>{link.label}</p>
                      </Link>
                    );
                  })}
                </div>

                <hr className="md:hidden my-2 bg-muted" />

                <div className="md:hidden flex flex-col justify-between">
                  <div className=" font-semibold w-full cursor-default px-2">
                    Products
                  </div>

                  <Link
                    href={`/vendor/products`}
                    onClick={() => setProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                      pathname === "/products" && "text-foreground"
                    )}
                  >
                    <FaBoxOpen className="py-3 w-auto h-11" />
                    <p>Products</p>
                  </Link>

                  <Link
                    href={`/vendor/create-product`}
                    onClick={() => setProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                      pathname === "/create-product" && "text-foreground"
                    )}
                  >
                    <LuPlusCircle className="py-3 w-auto h-11" />
                    <p>Create Product</p>
                  </Link>

                  <hr className="md:hidden my-2 bg-muted" />

                  <div className=" font-semibold w-full cursor-default px-2">
                    Categories / Subs
                  </div>

                  <Link
                    href={`/vendor/categories`}
                    onClick={() => setProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                      pathname === "/categories" && "text-foreground"
                    )}
                  >
                    <FaBoxOpen className="py-3 w-auto h-11" />
                    <p>Categories</p>
                  </Link>

                  <Link
                    href={`/vendor/sub-categories`}
                    onClick={() => setProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                      pathname === "/sub-categories" && "text-foreground"
                    )}
                  >
                    <LuPlusCircle className="py-3 w-auto h-11" />
                    <p>SubCategories</p>
                  </Link>

                  <hr className="md:hidden my-2 bg-muted" />

                  <div className=" font-semibold w-full cursor-default px-2">
                    Coupens
                  </div>

                  <Link
                    href={`/vendor/coupens`}
                    onClick={() => setProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted",
                      pathname === "/coupens" && "text-foreground"
                    )}
                  >
                    <HiMiniTicket className="py-3 w-auto h-11" />
                    <p>Coupens</p>
                  </Link>
                </div>

                <hr className="md:hidden my-2 bg-muted" />

                <div
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-2 rounded-md font-medium transition-colors hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <LuLogOut className="py-3 w-auto h-11" />
                  <h3>Logout</h3>
                </div>

                <h3 className="px-2 py-2 rounded-md font-medium text-secondary-foreground">
                  @{user?.email?.split("@")[0]}
                </h3>
              </div>
            </MotionSidebar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
