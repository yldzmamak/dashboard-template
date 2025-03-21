import Cookies from 'js-cookie';

import { StorageKeys } from '@/types/enums/system';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

class Cookie {
  setCookie = (key: string, value: string, options: CookieOptions): void => {
    Cookies.set(key, value, options);
  };

  getCookie = (key: string): string | undefined => {
    return Cookies.get(key) ?? '';
  };

  deleteCookie = (key: string): void => {
    Cookies.remove(key);
  };

  deleteAllCookies = (): void => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  };

  getToken = (): string | undefined => {
    return CookieService.getCookie(StorageKeys.AccessToken);
  };
}

export const CookieService = new Cookie();
