import { useQuery } from '@tanstack/react-query';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';



function getLastStudied() {
    
    const Courses = TraineeRoutes.GET.getLastViewed;
  
    Courses.URL = '/trainee/637969352c3f71696ca34759/last-viewed-course';
  
    return getRequest(Courses);

}

const useLastStudiedQuery = () => {

    return {
      ...useQuery(['traine-last-studied'], () => getLastStudied(), {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }),
    };
  };

  export default useLastStudiedQuery;