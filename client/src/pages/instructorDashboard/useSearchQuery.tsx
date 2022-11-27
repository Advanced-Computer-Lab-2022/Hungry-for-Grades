import { useQuery } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useState } from 'react';

import { type SelectFiltersType } from './types';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';

import { customComparator } from '@/utils/comparator';

const id = '637962792c3f71696ca3473c';

let oldFilters: SelectFiltersType;

async function searchRequest(
  filters: SelectFiltersType,
  page: number,
  setActivePage: Dispatch<SetStateAction<number>>,
  country: string
) {
  filters.country = country;
  //Here there was a problem in the postman whenever you pass priceHigh server error
  //So i removed it from the queries once it is done it have to be back
  // &priceHigh=${filters.priceHigh}

  if (!customComparator<SelectFiltersType>(oldFilters, filters)) {
    setActivePage(1);
    page = 1;
  }

  if (window) {
    window.scrollTo(0, 100);
  }
  oldFilters = filters;

  const Courses = InstructorRoutes.GET.getCourses;
  Courses.URL = `/courses/instructor/${id}`;
  Courses.query = `priceLow=${filters.priceLow}
  &priceHigh=${filters.priceHigh}
	&category=${filters.category}
	&durationHigh=${filters.durationHigh * 60 * 24 * 30}
  &searchTerm=${filters.searchTerm}
  &country=${filters.country}
	&limit=${12}
	&page=${page}`;

  return getRequest(Courses);
}

function useSearchQuery(filters: SelectFiltersType) {
  const [activePage, setActivePage] = useState<number>(1);
  const country = UseCountry();
  return {
    ...useQuery(
      ['search-instructor-courses', filters, activePage, country],
      () => searchRequest(filters, activePage, setActivePage, country),
      {
        retryDelay: 1000
      }
    ),
    activePage,
    setActivePage
  };
}

export default useSearchQuery;
