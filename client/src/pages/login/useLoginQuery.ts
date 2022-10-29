import { useMutation } from '@tanstack/react-query';

import { UserRoutes } from '../../services/axios/dataServices/UserDataService';
import { postRequest } from '../../services/axios/http-verbs';

import { LoginProps } from './types';

async function loginRequest(data: LoginProps) {
  const login = UserRoutes.POST.login;
  login.payload = data; // set the payload  /user?id=1&isAdmin:true;
  //alert(login.payload.email);
  /*  alert(login.payload.email); */
  return postRequest(login);
}

function useLoginQuery() {
  return useMutation(loginRequest, {
    cacheTime: 0,
    onError: error => {
      console.log(error);
      return error;
    },
    onSuccess: data => {
      console.log(data);
      return data;
    },
    retryDelay: 1000 // 1 second
  });
}

export default useLoginQuery;
