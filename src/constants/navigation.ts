import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export type SidebarScope = "group" | "tribe";

export type SidebarLinkConfig = {
  path: string;
  labelKey: string;
  icon: IconProp;
  color: string;
  end?: boolean;
  dividerAfter?: boolean;
  scopes?: SidebarScope[];
};

export const SIDEBAR_LINKS: SidebarLinkConfig[] = [
  {
    path: "",
    labelKey: "navigation.sidebar.today",
    icon: faHouse,
    color: "text-blue",
    end: true,
    dividerAfter: true,
  },
  {
    path: "/calendar",
    labelKey: "navigation.sidebar.calendar",
    icon: faCalendarDays,
    color: "text-green",
  },
  {
    path: "/trends",
    labelKey: "navigation.sidebar.trends",
    icon: faChartSimple,
    color: "text-yellow",
    scopes: ["group"],
  },
  {
    path: "/groups",
    labelKey: "navigation.sidebar.groups",
    icon: faChartSimple,
    color: "text-yellow",
    scopes: ["tribe"],
  },
  {
    path: "/settings",
    labelKey: "navigation.sidebar.settings",
    icon: faGear,
    color: "text-red",
  },
];
