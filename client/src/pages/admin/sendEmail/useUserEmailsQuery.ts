import { useQuery } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useState } from 'react';


import {type UserSearchFiltersType} from './types'

import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';
import { getRequest } from '@services/axios/http-verbs';
import { customComparator } from '@/utils/comparator';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { ICourse } from '@/interfaces/course.interface';

let oldFilters:UserSearchFiltersType;

async function searchRequest(
	filters:UserSearchFiltersType,
  page: number,
  setActivePage: Dispatch<SetStateAction<number>>,
) {

  if (!customComparator<UserSearchFiltersType>(oldFilters, filters)) {
    setActivePage(1);
    page = 1;
  }


  oldFilters = filters;

  const getCoursesSearchFilter = Object.assign(
    {},
    CoursesRoutes.GET.getCoursesSearchFilter
  );
  const searchQuery = `
	&sort=${filters.sort}
	&role=${filters.role}
	&limit=${18}
	&page=${page}
	&email=${filters.email}
	`.trim();
  getCoursesSearchFilter.query = searchQuery;

  return getRequest<PaginatedResponse<ICourse>>(getCoursesSearchFilter);
}

function useUserEmailsQuery(filters:UserSearchFiltersType ) {
  const [activePage, setActivePage] = useState<number>(1);


  return {
    ...useQuery(
      ['useUserEmailsQuery', filters, activePage],
      () => searchRequest(filters, activePage, setActivePage),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000 // 1 second
      }
    ),
    activePage,
    setActivePage
  };
}

export default useUserEmailsQuery;
