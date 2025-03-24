import { Navigate, Outlet } from 'react-router-dom';

import { AuthService } from '@/services/AuthService';

import { pathNames } from '@/types/constants';

const PrivateRoute = () => {
  const auth = AuthService.isUserLoggedIn();

  return auth ? <Outlet /> : <Navigate to={pathNames.authentication.loginPage} replace />;
};

export default PrivateRoute;
