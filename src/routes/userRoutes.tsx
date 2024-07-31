/* Imports */
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

/* Relative Imports */
import { PAGE_USER_DASHBOARD } from "./paths";

/* Local Imports */
import AuthGuard from "./guards/AuthGuard";
import UserDashboardLayout from "components/layout/UserLayout";

// ----------------------------------------------------------------------

/* Admin Dashboard Module Imports */
const HomePage = lazy(() => import("pages/home"));
const MyTasksPage = lazy(() => import("pages/home/MyTasks"));
const TeamTasksPage = lazy(() => import("pages/home/TeamTasks"));

const CalenderPage = lazy(() => import("pages/calenderPage"));
const NotificationPage = lazy(() => import("pages/notification"));
const SearchPage = lazy(() => import("pages/search"));

// ----------------------------------------------------------------------

/**
 * assign components to routes
 *
 * @return {array}
 */
const UserDashboardRoutes: Array<object> = [
  {
    path: PAGE_USER_DASHBOARD.root.relativePath,
    element: (
      <AuthGuard>
        <UserDashboardLayout>
          <Outlet />
        </UserDashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={PAGE_USER_DASHBOARD.home.absolutePath} />,
      },
      {
        path: PAGE_USER_DASHBOARD.home.relativePath,
        element: <HomePage />,
      },
      {
        path: PAGE_USER_DASHBOARD.home.myTasks.absolutePath,
        element: <MyTasksPage />,
      },
      {
        path: PAGE_USER_DASHBOARD.home.teamTasks.absolutePath,
        element: <TeamTasksPage />,
      },
      {
        path: PAGE_USER_DASHBOARD.calender.relativePath,
        element: <CalenderPage />,
      },
      {
        path: PAGE_USER_DASHBOARD.notification.relativePath,
        element: <NotificationPage />,
      },
      {
        path: PAGE_USER_DASHBOARD.search.relativePath,
        element: <SearchPage />,
      },
    ],
  },
  // {
  //   path: PAGE_USER_DASHBOARD.home.absolutePath,
  //   element: (
  //     <AuthGuard>
  //       <UserDashboardLayout>
  //         <HomePage />
  //       </UserDashboardLayout>
  //     </AuthGuard>
  //   ),
  // },
  // {
  //   path: PAGE_USER_DASHBOARD.calender.absolutePath,
  //   element: (
  //     <AuthGuard>
  //       <UserDashboardLayout>
  //         <CalenderPage />
  //       </UserDashboardLayout>
  //     </AuthGuard>
  //   ),
  // },
];

export default UserDashboardRoutes;
