/* import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { toast } from 'react-toastify';

import { useNavigate, useLocation } from 'react-router-dom';

import useRefreshToken from './useRefreshToken';

import { httpProtected } from '@services/axios/http-common';


import { toastOptions } from '@components/toast/options';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestIntercept = httpProtected.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (!config && !config?.headers && !config?.headers?.Authorization) {
          config?.headers?.Authorization = `Bearer ${authToken?.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept = httpProtected.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest?.sent = true;
          const newAccessToken = await refresh();
          prevRequest?.headers?.Authorization = `Bearer ${newAccessToken}`;
          return httpProtected(prevRequest);
        }
        navigate('/auth/login', { state: { from: location } });
        toast.error('UnAuthorized , Please Login First ', toastOptions);

        removeToken();
        return Promise.reject(error);
      }
    );

    return () => {
      httpProtected.interceptors.request.eject(requestIntercept);
      httpProtected.interceptors.response.eject(responseIntercept);
    };
  }, [authToken, location, navigate, refresh, removeToken]);

  return httpProtected;
};

export default useAxiosPrivate;
 */
