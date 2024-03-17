"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { logout } from "@/actions/logout";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  LuLogOut,
  LuUserCircle2,
  LuShoppingBag,
  LuXCircle,
  LuStar,
} from "react-icons/lu";

import MotionUserProfile from "../animations/user-profile-animation";
import ProfileSettings from "./profile-settings";
import { useRouter } from "next/navigation";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";

const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  const userProfileRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const user = useCurrentUser();

  const MENU_ITEMS = [
    {
      label: "Manage Profile",
      icon: LuUserCircle2,
      onClick: () => {
        setIsProfileSettingsOpen(true);
        setIsProfileOpen(false);
      },
    },
    {
      label: "My Orders",
      icon: LuShoppingBag,
      onClick: () => {
        router.push("/my-orders");
      },
    },
    {
      label: "My Cancellations",
      icon: LuXCircle,
      onClick: () => {
        router.push("/my-cancellations");
      },
    },
    {
      label: "My Reviews",
      icon: LuStar,
      onClick: () => {
        router.push("/my-reviews");
      },
    },
  ];

  useOnClickOutside(userProfileRef, () => {
    setIsProfileOpen(false);
  });

  return (
    <div ref={userProfileRef} className="relative">
      <Image
        src={user?.image || "/images/default-profile.png"}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full cursor-pointer h-9 w-9 group-hover:opacity-70"
        onClick={() => setIsProfileOpen((currValue) => !currValue)}
      />

      <div
        className={cn(
          "absolute right-0 z-30 px-2 py-3 rounded-md shadow-sm w-52 top-12 bg-primary text-primary-foreground duration-300",
          isProfileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-5 opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <h3 className="px-2 py-3 font-medium rounded-md text-muted-foreground">
              @{user?.email?.split("@")[0]}
            </h3>
          </li>

          <hr className="bg-border" />

          {MENU_ITEMS.map((item, index) => {
            return (
              <li
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-3 px-2 font-medium transition-colors rounded-md cursor-pointer hover:bg-popover"
              >
                <item.icon className="w-auto py-3 h-11" />
                <h3>{item.label}</h3>
              </li>
            );
          })}

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 font-medium transition-colors rounded-md cursor-pointer hover:bg-popover"
          >
            <LuLogOut className="w-auto py-3 h-11" />
            <h3>Logout</h3>
          </li>
        </ul>
      </div>

      <ProfileSettings
        isProfileSettingsOpen={isProfileSettingsOpen}
        setIsProfileSettingsOpen={setIsProfileSettingsOpen}
      />
    </div>
  );
};

export default UserProfile;
