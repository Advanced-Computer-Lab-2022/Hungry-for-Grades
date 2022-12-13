import { useQuery } from '@tanstack/react-query';


import { useState } from 'react';

import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';
import { getRequest } from '@services/axios/http-verbs';

import { PaginatedResponse } from '@/interfaces/response.interface';
import { ICourse } from '@/interfaces/course.interface';


async function searchRequest(
  page: number) {



  const getCoursesSearchFilter = Object.assign(
    {},
    CoursesRoutes.GET.getCoursesSearchFilter
  );
  const searchQuery = `
	&limit=${3}
	&page=${page}
	`.trim();
  getCoursesSearchFilter.query = searchQuery;


  return getRequest<PaginatedResponse<ICourse>>(getCoursesSearchFilter);
}

function useTopInstructorQuery() {
  const [activePage, setActivePage] = useState<number>(1);


  return {
    ...useQuery(
      ['useTopInstructorQuery', activePage],
      () => searchRequest( activePage),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000 // 1 second
      }
    ),
    activePage,
    setActivePage
  };
}

export default useTopInstructorQuery;
