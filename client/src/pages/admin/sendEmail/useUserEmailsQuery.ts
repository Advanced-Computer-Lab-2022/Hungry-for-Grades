import { useQuery } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useState } from 'react';

import { NewsLetterRoutes } from '../../../services/axios/dataServices/NewsLetterDataService';

import { type UserSearchFiltersType } from './types';

import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';
import { getRequest } from '@services/axios/http-verbs';
import { customComparator } from '@/utils/comparator';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { ICourse } from '@/interfaces/course.interface';

let oldFilters: UserSearchFiltersType;

async function searchRequest(
  filters: UserSearchFiltersType,
  page: number,
  setActivePage: Dispatch<SetStateAction<number>>
) {
  if (!customComparator<UserSearchFiltersType>(oldFilters, filters)) {
    setActivePage(1);
    page = 1;
  }

  oldFilters = filters;

  const getSubscribersSearchFilter = Object.assign(
    {},
    NewsLetterRoutes.GET.getAllSubscribers
  );
  const searchQuery = `
	&sort=${filters.sort}
	&role=${filters.role}
	&limit=${9}
	&page=${page}
	&email=${filters.email}
	`.trim();
  getSubscribersSearchFilter.query = searchQuery;

  return getRequest<
    PaginatedResponse<{
      email: string;
      role: string;
    }>
  >(getSubscribersSearchFilter);
}

function useUserEmailsQuery(filters: UserSearchFiltersType) {
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
