
import { StorageKeys } from '@/types/enums';
import { IGlobalAPIResponse } from '@/types/interfaces/response';
import { ILoginDataState, IMeDataState } from '@/types/interfaces/store/authState';
import { LoginPayload } from '@/types/login';

import { HttpService } from './BaseService';
import { CookieService } from './CookieService';

class Auth {
  login = (payload: LoginPayload) => {
    return HttpService.post<LoginPayload, IGlobalAPIResponse<ILoginDataState>>('/api/v0/auth/login', payload);
  };

  auth = () => {
    return HttpService.get<IGlobalAPIResponse<IMeDataState>>('/api/v0/users/me');
  };

  isUserLoggedIn = () => {
    const auth = CookieService.getToken();

    return !!auth;
  };

  logoutAuth = () => {
    CookieService.deleteCookie(StorageKeys.AccessToken);
  };
}

export const AuthService = new Auth();
