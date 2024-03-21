"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Sidebar from "./_components/Sidebar";

export const ExpandContext = createContext<{
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
  profileOpen: boolean;
  setProfileOpen: Dispatch<SetStateAction<boolean>>;
}>({
  expandSidebar: false,
  setExpandSidebar: () => {},
  profileOpen: false,
  setProfileOpen: () => {},
});

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [expandSidebar, setExpandSidebar] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <ExpandContext.Provider
      value={{ expandSidebar, setExpandSidebar, profileOpen, setProfileOpen }}
    >
      <Sidebar />
      <div className="relative">
        {expandSidebar ? (
          <LuChevronLeft
            className="w-7 h-7 rounded-r-md cursor-pointer absolute top-[6.5%] -left-5"
            onClick={() => {
              setExpandSidebar(!expandSidebar);
              setProfileOpen(false);
            }}
          />
        ) : (
          <LuChevronRight
            className="w-7 h-7 rounded-r-md cursor-pointer absolute top-[6.5%] -left-5"
            onClick={() => {
              setExpandSidebar(!expandSidebar);
              setProfileOpen(false);
            }}
          />
        )}
      </div>
      {children}
    </ExpandContext.Provider>
  );
};

export default LayoutWrapper;
