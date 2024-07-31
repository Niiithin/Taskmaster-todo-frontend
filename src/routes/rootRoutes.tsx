/* Imports */
import { lazy } from "react";

/* Relative Imports */
import UserGuard from "./guards/UserGuard";
import AuthLayout from "components/layout/AuthLayout";

/* Local Imports */
import { PAGE_ROOT, ROOT_PATH } from "./paths";

// ----------------------------------------------------------------------

/* Auth Module Imports */
const SignInPage = lazy(() => import("pages/auth/SignIn"));
const SignUpPage = lazy(() => import("pages/auth/SignUp"));

const NotFoundPage = lazy(() => import("pages/page-not-found"));

// ----------------------------------------------------------------------

/**
 * assign components to routes
 *
 * @return {array}
 */
const RootRoutes: Array<object> = [
  {
    path: ROOT_PATH,
    element: (
      <UserGuard>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </UserGuard>
    ),
  },
  {
    path: PAGE_ROOT.signIn.relativePath,
    element: (
      <UserGuard>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </UserGuard>
    ),
  },
  {
    path: PAGE_ROOT.signUp.relativePath,
    element: (
      <UserGuard>
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      </UserGuard>
    ),
  },
];

/**
 * assign component to no found routes
 *
 * @return {array}
 */
export const NotFoundRoutes: Array<object> = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default RootRoutes;
