import { Navigate, Outlet } from "react-router-dom";

import { AuthService } from "@/services/AuthService";

import { pathNames } from "@/types/constants";

const AuthLayout = () => {
  const auth = AuthService.isUserLoggedIn();

  return auth ? <Navigate to={pathNames.dashboardPage} replace /> : <Outlet />;
};

export default AuthLayout;
