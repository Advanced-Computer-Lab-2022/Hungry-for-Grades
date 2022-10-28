/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import { toast } from 'react-toastify';
const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

type TokenType = {
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
};

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const unParsedToken = localStorage.getItem('token');
  if (unParsedToken) {
    const { ACCESS_TOKEN } = JSON.parse(unParsedToken) as TokenType;

    if (ACCESS_TOKEN && config && config.headers) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
  }
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const { status } = error.response as AxiosResponse;
  switch (status) {
    case 401:
      history.pushState(
        {
          nextPath: window.location.pathname
        },
        '/login'
      );
      toast.error('Unauthorized');
      break;
    case 403:
      toast.error('Forbidden access');
      break;
    case 404:
      toast.error('Page Not Found');
      break;
    case 500:
      history.pushState(
        {
          nextPath: window.location.pathname
        },
        '/login'
      );
      toast.error('Internal Server Error');
      break;
    default:
      toast.error(error.message);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const unParsedToken = localStorage.getItem('token');
  if (
    error.response &&
    unParsedToken &&
    error.response.status === 401 &&
    error.response.data
    //error.response.data?.error !== null &&
    //error.response.data?.message === 'jwt expired'
  ) {
    const { REFRESH_TOKEN } = JSON.parse(unParsedToken) as TokenType;

    try {
      const rs = await axios.post(`${APP_BASE_API_URL}/auth/refresh`, {
        REFRESH_TOKEN: REFRESH_TOKEN
      });

      const { token }: { token: string } = rs.data as { token: string };

      localStorage.setItem('token', JSON.stringify(token));
      //localStorage.setItem('user', JSON.stringify(user));
    } catch (_error) {
      return Promise.reject(_error);
    }
  }

  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
