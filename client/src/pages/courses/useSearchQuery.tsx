import { useQuery } from '@tanstack/react-query';

import { type SelectFiltersType } from './types';

import { UserRoutes } from '@services/axios/dataServices/UserDataService';
import { postRequest } from '@services/axios/http-verbs';

async function searchRequest(filters: SelectFiltersType) {
  const login = UserRoutes.POST.login;
   	alert ( filters);
    return postRequest(login);
}

function useSearchQuery(filters: SelectFiltersType) {
  return useQuery(['search', filters], () => searchRequest(filters), {
    cacheTime: 1000 * 60 * 60 * 24,
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

export default useSearchQuery;
