
import { StorageKeys } from '@/types/enums';
import { ILoginPayload } from '@/types/interfaces/login';
import { IGlobalAPIResponse } from '@/types/interfaces/response';
import { ILoginDataState, IMeDataState } from '@/types/interfaces/store/authentication';

import { HttpService } from './BaseService';
import { CookieService } from './CookieService';

class Auth {
  login = (payload: ILoginPayload) => {
    return HttpService.post<ILoginPayload, IGlobalAPIResponse<ILoginDataState>>('/api/v0/auth/login', payload);
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
