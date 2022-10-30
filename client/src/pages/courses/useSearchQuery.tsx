import { useQuery } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useState } from 'react';

import { type SelectFiltersType } from './types';

import { CoursesRoutes } from '@services/axios/dataServices/CoursesDataService';
import { getRequest } from '@services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';
import { customComparator } from '@/utils/comparator';

let oldFilters: SelectFiltersType;

async function searchRequest(
  filters: SelectFiltersType,
  page: number,
  setActivePage: Dispatch<SetStateAction<number>>,
  country: string
) {
  filters.country = country;

  if (!customComparator<SelectFiltersType>(oldFilters, filters)) {
    setActivePage(1);
    page = 1;
  }
  if (window) {
    window.scrollTo(0, 100);
  }
  oldFilters = filters;

  const getCoursesSearchFilter = CoursesRoutes.GET.getCoursesSearchFilter;
  getCoursesSearchFilter.params = `
	searchTerm=${filters.searchTerm}
	&category=${filters.category}
	&subCategory=${filters.subCategory}
	&level=${filters.level}
	&priceLow=${filters.paid && filters.free ? 0 : filters.paid ? 1 : 0}
	${filters.paid && filters.free ? '' : filters.free ? '&priceHigh=0' : ''}
	&sortBy=${filters.sortBy}
	&durationLow=${filters.durationLow}
	&durationHigh=${filters.durationHigh}
	&country=${filters.country}
	&limit=${12}
	&page=${page}`;
  alert(getCoursesSearchFilter.params);
  return getRequest(getCoursesSearchFilter);
}

function useSearchQuery(filters: SelectFiltersType) {
  const [activePage, setActivePage] = useState<number>(1);
  const country = UseCountry();

  return {
    ...useQuery(
      ['search', filters, activePage, country],
      () => searchRequest(filters, activePage, setActivePage, country),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000 // 1 second
      }
    ),
    activePage,
    setActivePage
  };
}

export default useSearchQuery;
