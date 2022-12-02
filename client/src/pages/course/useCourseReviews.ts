import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRequest } from '@/services/axios/http-verbs';
import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';

async function getCourses(activePage: number, id: string) {
  const Courses = CoursesRoutes.GET.getCourseReviews;

  Courses.query = `page=${activePage}&limit=${4}`;

  Courses.params = id;

  return getRequest(Courses);
}

const useCoursesQuery = (id: string) => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['course-reviewsss', activePage],
      () => getCourses(activePage, id),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    ),
    activePage,
    setActivePage
  };
};

export default useCoursesQuery;
