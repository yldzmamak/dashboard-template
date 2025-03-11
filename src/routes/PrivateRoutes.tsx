import { Navigate, Outlet } from "react-router-dom";

import { StorageService } from "@/services/Storage.service";

import { StorageKeys } from "@/types/enums/system";

const PrivateRoute = () => {
  const sessionToken = StorageService.getLocalStorageItem(StorageKeys.Token);

  return sessionToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
