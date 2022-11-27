/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

  const getCoursesSearchFilter = Object.assign(
    {},
    CoursesRoutes.GET.getCoursesSearchFilter
  );
  const searchQuery = `category=${filters.category.trim()}
	&subCategory=${filters.subCategory}
	&level=${filters.level}
	&priceLow=${
    filters.paid && filters.free ? filters.min : filters.paid ? 1 : filters.min
  }
	&priceHigh=${
    filters.paid && filters.free ? filters.max : filters.free ? 0 : filters.max
  }
	&sortBy=${filters.sortBy}
	&durationLow=${(filters.durationLow ?? 0) * 24 * 30}
	&durationHigh=${filters.durationHigh * 24 * 30}
	&country=${filters.country.trim()}
	&limit=${18}
	&page=${page}
	&searchTerm=${filters.searchTerm.trim()}
	`.trim();
  getCoursesSearchFilter.query = searchQuery;
  //	const [searchParams] = useSearchParams();

  //	alert(getCoursesSearchFilter.query);
  /*   const searchQuery = toString(filters);

	console.log('searchQuery');
	console.log(searchQuery);
  //navigateSearch('/courses', searchQuery);
 */

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
