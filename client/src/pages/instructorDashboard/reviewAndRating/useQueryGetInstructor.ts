import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

function getInstructor() {
    
  const Inst = InstructorRoutes.GET.getInstructor;

  Inst.URL = '/instructor/6379620f2c3f71696ca34735'

  //Inst.params = '6379620f2c3f71696ca34735';

  return getRequest(Inst);

}


const useCoursesQuery = () => {

  return {
    ...useQuery(['instructorSelffdataaa'], () => getInstructor(), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    })
  };
};

export default useCoursesQuery;
