import { useQuery } from '@tanstack/react-query';

import { type SelectFiltersType } from './types';

import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';
import { getRequest } from '@services/axios/http-verbs';

async function searchRequest(filters: SelectFiltersType) {
  const getCoursesSearchFilter = CoursesRoutes.GET.getCoursesSearchFilter;
  getCoursesSearchFilter.params = `searchTerm=${filters.searchTerm}&category=${
    filters.category
  }&subCategory=${filters.subCategory}&level=${filters.level}&priceLow=${
    filters.paid && filters.free ? 0 : filters.paid ? 1 : 0
  }${
    filters.paid && filters.free ? '' : filters.free ? '&priceHigh=0' : ''
  }&sortBy=${filters.sortBy}&durationLow=${filters.durationLow}&durationHigh=${
    filters.durationHigh
  }`;

  return getRequest(getCoursesSearchFilter);
}

function useSearchQuery(filters: SelectFiltersType) {
  return useQuery(['search', filters], () => searchRequest(filters), {
    cacheTime: 1000 * 60 * 60 * 24,
    retryDelay: 1000 // 1 second
  });
}

export default useSearchQuery;
