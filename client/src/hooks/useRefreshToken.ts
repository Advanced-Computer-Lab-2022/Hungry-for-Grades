/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { AuthRoutes } from '@/services/axios/dataServices/AuthDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { UseAuthStoreSetToken } from '@/store/authStore';
import { toastOptions } from '@components/toast/options';

function useRefreshToken(): () => Promise<string> {
  const useAuthStoreSetToken = UseAuthStoreSetToken();
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    alert('useRefreshToken');
    try {
      const dataService = Object.assign({}, AuthRoutes.GET.refresh);
      const response = await getRequest(dataService, false, {
        withCredentials: true
      });
      useAuthStoreSetToken(response?.data?.accessToken);
      return response?.data?.data?.data?.accessToken;
    } catch (error) {
      navigate('/auth/login', { state: { from: location } });
      toast.error('UnAuthorized , Please Login First ', toastOptions);
      console.log(error);
      return '';
    }
  };
}

export default useRefreshToken;
