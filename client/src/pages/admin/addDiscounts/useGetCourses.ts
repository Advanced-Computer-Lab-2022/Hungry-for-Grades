import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { PaginatedResponse } from '@/interfaces/response.interface';
import { getRequest } from '@/services/axios/http-verbs';
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';
import { ICourse } from '@/interfaces/course.interface';

// NEEDS TO BE REVISED BECAUSE IT PRODUCES A WARNING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCourses(_activePage: number) {
  const Courses = CoursesRoutes.GET.getCourses;

  Courses.query = `page=${_activePage}`;

  return getRequest<PaginatedResponse<ICourse>>(Courses);
}

export function useGetCourses(updates: number) {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['admin-gimme-myCoursesandDiscounts', activePage, location, updates],
      () => getCourses(activePage),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    ),
    activePage,
    setActivePage
  };
}
