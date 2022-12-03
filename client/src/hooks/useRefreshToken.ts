/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { AuthRoutes } from '@/services/axios/dataServices/AuthDataService';
import { getRequest } from '@/services/axios/http-verbs';
import {
  UseAuthStoreSetToken,
  UseAuthStoreGetRefreshToken
} from '@/store/authStore';
import { toastOptions } from '@components/toast/options';
import SessionStorage from '@/services/sessionStorage/SessionStorage';
import { UseUserSetIsAuthenticated } from '@/store/userStore';

function useRefreshToken(): () => Promise<string> {
  const useAuthStoreSetToken = UseAuthStoreSetToken();
  const useUserSetIsAuthenticated = UseUserSetIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    alert('useRefreshToken');
    const refreshToken = UseAuthStoreGetRefreshToken();
    try {
      const dataService = Object.assign({}, AuthRoutes.GET.refresh);
      dataService.payload = {
        refreshToken: refreshToken
      };
      console.log('useRefreshToken');
      const response = await getRequest(dataService, {
        withCredentials: true
      });
      const token = response?.data?.token;
      SessionStorage.set('accessToken', token);
      useAuthStoreSetToken(token);
      useUserSetIsAuthenticated(true);

      return response?.data?.data?.data?.accessToken;
    } catch (error) {
      console.log(error);
      navigate('/auth/login', { state: { from: location }, replace: true });
      toast.error('UnAuthorized , Please Login First ', toastOptions);
      console.log(error);
      return '';
    }
  };
}

export default useRefreshToken;
