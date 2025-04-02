import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { pathNames } from '@/types/constants';

const PrivateRoute = lazy(() => import('./PrivateRoutes'));

const AuthLayout = lazy(() => import('@/layout/AuthLayout/AuthLayout'));
const DashboardLayout = lazy(() => import('@/layout/DashboardLayout/DashboardLayout'));

const Home = lazy(() => import('@/pages/Dashboard/Home/Home'));
const Login = lazy(() => import('@/pages/Auth/Login/Login'));
const Profile = lazy(() => import('@/pages/Dashboard/Profile/Profile'));
const UserList = lazy(() => import('@/pages/Dashboard/UserList/UserList'));
const User = lazy(() => import('@/pages/Dashboard/User/User'));

const AppRoutes = () => (
  <Routes>
    <Route
      element={
        <Suspense>
          <AuthLayout />
        </Suspense>
      }
    >
      <Route path={pathNames.authentication.loginPage} element={<Login />} />
      <Route path="/" element={<Navigate to={pathNames.authentication.loginPage} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>

    <Route
      element={
        <Suspense>
          <PrivateRoute />
        </Suspense>
      }
    >
      <Route element={<DashboardLayout />}>
        <Route path={pathNames.dashboardPage} element={<Home />} />
        <Route path={pathNames.profilePage} element={<Profile />} />
        <Route path={pathNames.userListPage} element={<UserList />} />
        <Route path={pathNames.userPage} element={<User />} />
        <Route path={`${pathNames.userPage}/:id`} element={<User />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
