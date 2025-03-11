import { Route, Routes } from "react-router-dom";

import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Profile from "@/pages/Profile/Profile";

import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
