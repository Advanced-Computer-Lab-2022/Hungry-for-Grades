import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@services/axios/http-verbs';

import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';
import { HttpResponse } from '@/interfaces/response.interface';
import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';
import { IInstructor } from '@/interfaces/instructor.interface';
import { IUser } from '@/interfaces/user.interface';

async function userInfoRequest() {
  const getUserInfo = Object.assign({}, TraineeRoutes.GET.getTrainee);
  getUserInfo.URL = `/user/info`;

  return getRequest<
    HttpResponse<(IInstructor | ITrainee | IUser) & { role: Role }>
  >(getUserInfo);
}

function useUserInfoQuery(enable: boolean) {
  return {
    ...useQuery(['getUserInfo'], userInfoRequest, {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000, // 1 second
      enabled: enable
    })
  };
}

export default useUserInfoQuery;
