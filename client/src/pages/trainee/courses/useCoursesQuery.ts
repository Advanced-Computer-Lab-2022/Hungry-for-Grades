import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRequest } from '@/services/axios/http-verbs';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

async function getCourses(activePage: number) {
  const Courses = TraineeRoutes.GET.getMyCourses;

  Courses.URL = 'trainee/637969352c3f71696ca34759/courses';

  Courses.query = `page=${activePage}
	&limit=${6}`;

  return getRequest(Courses);
}
const useCoursesQuery = () => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(['traine-courses', activePage], () => getCourses(activePage), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    }),
    activePage,
    setActivePage
  };
};

export default useCoursesQuery;
