
import { StorageKeys } from '@/types/enums';
import { ILoginPayload } from '@/types/interfaces/login';

import { HttpService } from './BaseService';
import { CookieService } from './CookieService';

class Auth {
  login = (payload: ILoginPayload) => {
    return HttpService.post(`/api/v0/auth/login`, payload);
  };

  isUserLoggedIn = () => {
    const auth = CookieService.getToken();

    return !!auth;
  };

  logoutAuth = () => {
    CookieService.deleteCookie(StorageKeys.Token);
  };
}

export const AuthService = new Auth();
