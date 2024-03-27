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

      {expandSidebar ? (
        <LuChevronLeft
          className="w-8 h-8 rounded-r-md cursor-pointer sticky top-[3rem] -ml-[1rem]"
          onClick={() => {
            setExpandSidebar(!expandSidebar);
            setProfileOpen(false);
          }}
        />
      ) : (
        <LuChevronRight
          className="w-8 h-8 rounded-r-md cursor-pointer sticky top-[3rem] -ml-[1rem]"
          onClick={() => {
            setExpandSidebar(!expandSidebar);
            setProfileOpen(false);
          }}
        />
      )}

      {children}
    </ExpandContext.Provider>
  );
};

export default LayoutWrapper;
