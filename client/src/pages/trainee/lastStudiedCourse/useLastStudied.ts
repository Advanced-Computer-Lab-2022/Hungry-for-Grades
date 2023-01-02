import { useQuery } from '@tanstack/react-query';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { EnrolledCourse } from '@/interfaces/course.interface';
import { HttpResponse } from '@/interfaces/response.interface';

function getLastStudied() {
  const Courses = TraineeRoutes.GET.getLastViewed;

  Courses.URL = '/trainee/637969352c3f71696ca34759/last-viewed-course';

  return getRequest<HttpResponse<EnrolledCourse>>(Courses);
}

const useLastStudiedQuery = (location: Location) => {
  return {
    ...useQuery(['traine-last-studied', location], () => getLastStudied(), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    })
  };
};

export default useLastStudiedQuery;
