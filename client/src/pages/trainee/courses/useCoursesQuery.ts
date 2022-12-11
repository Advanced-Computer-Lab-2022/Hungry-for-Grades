import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRequest } from '@/services/axios/http-verbs';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { EnrolledCourse } from '@/interfaces/course.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';

async function getCourses(activePage: number, user : IUser) {
  const Courses = TraineeRoutes.GET.getMyCourses;

  Courses.URL = `trainee/${user?._id}/courses`;

  Courses.query = `page=${activePage}
	&limit=${6}`;

  return getRequest<PaginatedResponse<EnrolledCourse>>(Courses);
}
const useCoursesQuery = (user : IUser) => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(['traine-courses', activePage, location], () => getCourses(activePage, user), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    }),
    activePage,
    setActivePage
  };
};

export default useCoursesQuery;
