import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Profile from "@/pages/Profile/Profile";

import { pathNames } from "@/types/constants";

import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path={pathNames.loginPage} element={<Login />} />
      <Route path="/" element={<Navigate to={pathNames.loginPage} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>

    <Route element={<PrivateRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path={pathNames.dashboardPage} element={<Home />} />
        <Route path={pathNames.profilePage} element={<Profile />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
