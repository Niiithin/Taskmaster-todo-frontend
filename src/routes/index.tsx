/* Imports */
import { Suspense, useContext, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";

/* Relative Imports */
import LoadingScreen from "components/LoadingScreen";
// import { useSession } from "context/SessionContext";

/* Local Imports */
import RootRoutes, { NotFoundRoutes } from "./rootRoutes";
import UserDashboardRoutes from "./userRoutes";
import SessionContext from "context/SessionContext";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

/**
 * Create routing with the routes
 *
 * @return {JSX.Element}
 */
const Routing: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState([
    ...RootRoutes,
    ...UserDashboardRoutes,
    ...NotFoundRoutes,
  ]);
  const content = useRoutes(routes);
  const { isAuthenticated, user } = useContext(SessionContext);
  useEffect(() => {
    const newRoutes: any = [];
    if (isAuthenticated && user) {
      setRoutes([...RootRoutes, ...UserDashboardRoutes, ...newRoutes]);
    }
  }, [isAuthenticated, user]);

  return <Suspense fallback={<LoadingScreen />}>{content}</Suspense>;
};

export default Routing;
