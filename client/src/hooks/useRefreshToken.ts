/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { AuthRoutes } from '@/services/axios/dataServices/AuthDataService';
import { getRequest } from '@/services/axios/http-verbs';

import { toastOptions } from '@components/toast/options';
import SessionStorage from '@/services/sessionStorage/SessionStorage';
import { UseUserSetIsAuthenticated } from '@/store/userStore';
import LocalStorage from '@/services/localStorage/LocalStorage';

function useRefreshToken(): () => Promise<void> {
  const useUserSetIsAuthenticated = UseUserSetIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    const refreshToken = LocalStorage.get('refreshToken');
    const oldAccessToken = SessionStorage.get('accessToken');

    if (!refreshToken) {
      if (oldAccessToken) {
        useUserSetIsAuthenticated(true);
        return;
      }
      useUserSetIsAuthenticated(false);
      navigate('/auth/login', { state: { from: location }, replace: true });
      toast.error('UnAuthorized , Please Login First ', toastOptions);
      return;
    }

    try {
      const dataService = Object.assign({}, AuthRoutes.GET.refresh);

      const response = await getRequest(dataService, {
        withCredentials: true
      });

      const accessToken = response?.data?.data?.accessToken as string;
      if (!accessToken) {
        navigate('/auth/login', { state: { from: location }, replace: true });
        toast.error('UnAuthorized , Please Login First kk', toastOptions);
        return;
      }

      console.log(accessToken);
      SessionStorage.set('accessToken', accessToken);
      return;
    } catch (error) {
      console.log(error);
      useUserSetIsAuthenticated(false);
      //navigate('/auth/login', { state: { from: location }, replace: true });
      toast.error('UnAuthorized , Please Login First heww', toastOptions);
      console.log(error);
      return;
    }
  };
}

export default useRefreshToken;
