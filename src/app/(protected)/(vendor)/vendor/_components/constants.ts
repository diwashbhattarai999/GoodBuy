import {
  LuBarChartBig,
  LuContact,
  LuLayoutDashboard,
  LuMessageCircle,
  LuNewspaper,
  LuUsers2,
} from "react-icons/lu";

export const SIDEBAR_LINKS = [
  {
    href: "dashboard",
    label: "Dashboard",
    icon: LuLayoutDashboard,
  },
  {
    href: "sales",
    label: "Sales",
    icon: LuBarChartBig,
  },
  {
    href: "orders",
    label: "Orders",
    icon: LuNewspaper,
  },
  {
    href: "users",
    label: "Users",
    icon: LuUsers2,
  },
  {
    href: "messages",
    label: "Messages",
    icon: LuMessageCircle,
  },
];
