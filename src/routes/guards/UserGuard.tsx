import SessionContext from "context/SessionContext";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PAGE_USER_DASHBOARD } from "routes/paths";

export interface UserGuardProps {
  children: React.ReactElement;
}

const UserGuard: React.FC<UserGuardProps> = ({ children }): JSX.Element => {
  const { isAuthenticated } = useContext(SessionContext);
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get("returnurl");

  if (isAuthenticated) {
    const redirectPath = returnUrl || PAGE_USER_DASHBOARD.root.absolutePath;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default UserGuard;
