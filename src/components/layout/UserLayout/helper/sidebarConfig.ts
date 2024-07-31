/* Imports */
import { PAGE_USER_DASHBOARD } from "routes/paths";

/* Side bar tabs */
const SidebarConfig = [
  {
    title: "Home Page",
    href: PAGE_USER_DASHBOARD.home.absolutePath,
    icon: "/icons/home_unselected.svg",
    selectedIcon: "/icons/home_selected.svg",
  },
  {
    title: "Calender",
    href: PAGE_USER_DASHBOARD.calender.absolutePath,
    icon: "/icons/calendar_unselected.svg",
    selectedIcon: "/icons/calendar_selected.svg",
  },
  {
    title: "Notifications",
    href: PAGE_USER_DASHBOARD.notification.absolutePath,
    icon: "/icons/notification_unselected.svg",
    selectedIcon: "/icons/notification_selected.svg",
  },
  {
    title: "Search",
    href: PAGE_USER_DASHBOARD.search.absolutePath,
    icon: "/icons/search_unselected.svg",
    selectedIcon: "/icons/search_icon.svg",
  },
];

export default SidebarConfig;
