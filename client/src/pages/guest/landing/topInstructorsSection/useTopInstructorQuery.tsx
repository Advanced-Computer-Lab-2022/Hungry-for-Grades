import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { InstructorRoutes } from '@services/axios/dataServices/InstructorDataService';
import { getRequest } from '@services/axios/http-verbs';

import { PaginatedResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

async function searchRequest(page: number) {
  const getTopInstructors = Object.assign(
    {},
    InstructorRoutes.GET.getTopInstructors
  );
  const searchQuery = `
	&limit=${3}
	&page=${page}
	`.trim();
  getTopInstructors.query = searchQuery;

  return getRequest<PaginatedResponse<IInstructor>>(getTopInstructors);
}

function useTopInstructorQuery() {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['useTopInstructorQuery', activePage],
      () => searchRequest(activePage),
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
