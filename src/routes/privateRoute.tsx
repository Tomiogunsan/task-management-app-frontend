import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "helpers/auth";

import { AuthPaths } from "@constants/path";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticatedUser = isAuthenticated();
  if (!isAuthenticatedUser) {
    return (
      <Navigate
        to={AuthPaths.SIGNIN}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

export default PrivateRoute;
