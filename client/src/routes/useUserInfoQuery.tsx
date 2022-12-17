import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@services/axios/http-verbs';

import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';
import { HttpResponse } from '@/interfaces/response.interface';
import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';
import { IInstructor } from '@/interfaces/instructor.interface';
import { IUser } from '@/interfaces/user.interface';
import { UseCountry } from '@/store/countryStore';

async function userInfoRequest(country:string) {
  const getUserInfo = Object.assign({}, TraineeRoutes.GET.getTrainee);
  getUserInfo.URL = `/user/info?country=${country}`;

  return getRequest<
    HttpResponse<(IInstructor | ITrainee | IUser) & { role: Role }>
  >(getUserInfo);
}

function useUserInfoQuery(enable: boolean) {
  const country = UseCountry();
  return {
    ...useQuery(['getUserInfo'], ()=>userInfoRequest(country), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000, // 1 second
      enabled: enable
    })
  };
}

export default useUserInfoQuery;
