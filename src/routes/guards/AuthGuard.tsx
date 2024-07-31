import SessionContext from "context/SessionContext";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PAGE_ROOT } from "routes/paths";

export interface AuthGuardProps {
  children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }): JSX.Element => {
  const { isAuthenticated } = useContext(SessionContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`${PAGE_ROOT.signIn.absolutePath}?returnurl=${location.pathname}`}
        replace
      />
    );
  }

  return children;
};

export default AuthGuard;
