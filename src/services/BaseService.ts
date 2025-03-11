import { notification } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/* import InnerHTMLComponent from '@/components/InnerHTMLComponent/InnerHTMLComponent';
import { ErrorIcon } from '@/components/svg'; */

import { CodeType } from '@/types/enums';

import { AuthService } from './AuthService';

interface ApiResponse<T> {
  todos: never[];
  data: T;
}

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

    this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess = (response: AxiosResponse) => {
    if (response.status === 204) {
      return null;
    } else {
      if (response.data.resultInfo.code !== CodeType.Success) {
        notification.warning({
          message: response.data.resultInfo.message,
          duration: 3,
          showProgress: true,
        });
      }

      if ([105, 108].includes(response.data.responseHeader.message.code)) {
        AuthService.logoutAuth();
      }

      return response?.data;
    }
  };

  private handleError = (error: {
    response: {
      status: number;
      data: { resultInfo: { isSuccess: boolean; code: string; message: string } };
    };
  }) => {
    console.error(error);

    return Promise.reject({
      ...error,
      data: error.response.data,
      status: error.response.status,
    });
  };

  get<T, R = AxiosResponse<ApiResponse<T>>>(
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

  patch<T, R = AxiosResponse<ApiResponse<T>>>(
    ...params: Parameters<AxiosInstance['patch']>
  ): Promise<R> {
    return this.axiosInstance.patch(...params);
  }

  put<T, R = AxiosResponse<ApiResponse<T>>>(
    ...params: Parameters<AxiosInstance['put']>
  ): Promise<R> {
    return this.axiosInstance.put(...params);
  }

  delete<T, R = AxiosResponse<ApiResponse<T>>>(
    ...params: Parameters<AxiosInstance['delete']>
  ): Promise<R> {
    return this.axiosInstance.delete(...params);
  }
}

export const HttpService = new Http();
