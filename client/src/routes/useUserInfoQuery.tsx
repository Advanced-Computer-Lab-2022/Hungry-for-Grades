import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@services/axios/http-verbs';

import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';

async function userInfoRequest() {
  const getUserInfo = Object.assign({}, TraineeRoutes.GET.getTrainee);
  getUserInfo.URL = `/user/info`;

  return getRequest(getUserInfo);
}

function useUserInfoQuery() {
  return {
    ...useQuery(['getUserInfo'], userInfoRequest, {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    })
  };
}

export default useUserInfoQuery;
