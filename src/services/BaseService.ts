import { notification } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/* import InnerHTMLComponent from '@/components/InnerHTMLComponent/InnerHTMLComponent';
import { ErrorIcon } from '@/components/svg'; */

import { CodeType, StorageKeys } from '@/types/enums';
import { IGlobalAPIResponse } from '@/types/interfaces/response';

import { AuthService } from './AuthService';
import { CookieService } from './CookieService';

class Http {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VITE_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const auth = AuthService.isUserLoggedIn();
      if (auth) {
        config.headers['Authorization'] = `Bearer ${CookieService.getCookie(StorageKeys.AccessToken)}`;
        config.headers['ngrok-skip-browser-warning'] = true;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess = (response: AxiosResponse) => {
    if (response.data.resultInfo.code !== CodeType.Success) {
      notification.warning({
        message: response.data.resultInfo.message,
        duration: 3,
        showProgress: true,
      });
    }

    return response?.data;
  };

  private handleError = (error: {
    response: {
      status: number;
      data: { resultInfo: { isSuccess: boolean; code: string; message: string } };
    };
  }) => {
    console.error(error);

    if (error.response && error.response.status === 401) {
      notification.warning({
        message: error.response.data.resultInfo.message,
        duration: 3,
        showProgress: true,
      });

      AuthService.logoutAuth();
    }

    return Promise.reject({
      ...error,
      data: error.response.data,
      status: error.response.status,
    });
  };

  get<T, R = AxiosResponse<IGlobalAPIResponse<T>>>(
    ...params: Parameters<AxiosInstance['get']>
  ): Promise<R> {
    return this.axiosInstance.get(...params);
  }

  public async post<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    const response = await this.axiosInstance.post(url, data, config);
    return response;
  }

  patch<T, R = AxiosResponse<IGlobalAPIResponse<T>>>(
    ...params: Parameters<AxiosInstance['patch']>
  ): Promise<R> {
    return this.axiosInstance.patch(...params);
  }

  put<T, R = AxiosResponse<IGlobalAPIResponse<T>>>(
    ...params: Parameters<AxiosInstance['put']>
  ): Promise<R> {
    return this.axiosInstance.put(...params);
  }

  delete<T, R = AxiosResponse<IGlobalAPIResponse<T>>>(
    ...params: Parameters<AxiosInstance['delete']>
  ): Promise<R> {
    return this.axiosInstance.delete(...params);
  }
}

export const HttpService = new Http();
