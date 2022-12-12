import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { IUser } from '@/interfaces/user.interface';
import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

function getInstructor(user: IUser) {
  const Inst = InstructorRoutes.GET.getInstructor;

  Inst.params = user?._id;

  return getRequest<HttpResponse<IInstructor>>(Inst);
}

const useCoursesQuery = (user: IUser) => {
  return {
    ...useQuery(['instructorSelffdataaa'], () => getInstructor(user), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    })
  };
};

export default useCoursesQuery;
