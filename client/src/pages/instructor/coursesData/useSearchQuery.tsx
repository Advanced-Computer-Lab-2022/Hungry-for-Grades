import { useQuery } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useState } from 'react';

import { type SelectFiltersType } from '@/pages/guest/searchCourses/types';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';

import { customComparator } from '@/utils/comparator';
import { ITeachedCourse } from '@/interfaces/instructor.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { UseUser } from '@/store/userStore';

let oldFilters: SelectFiltersType;

async function searchRequest(
  id: string,
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
    InstructorRoutes.GET.getCourses
  );
  getCoursesSearchFilter.URL = `/courses/instructor/${id}`;
  const searchQuery = `category=${filters.category}
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
	&country=${filters.country}
	&limit=${18}
	&page=${page}
	&searchTerm=${filters.searchTerm}
	`.trim();
  getCoursesSearchFilter.query = searchQuery;

  return getRequest<PaginatedResponse<ITeachedCourse>>(getCoursesSearchFilter);
}

function useSearchQuery(filters: SelectFiltersType) {
  const [activePage, setActivePage] = useState<number>(1);
  const useUser = UseUser();
  const country = UseCountry();
  return {
    ...useQuery(
      ['search-instructor-courses', filters, activePage, country],
      () =>
        searchRequest(
          useUser?._id,
          filters,
          activePage,
          setActivePage,
          country
        ),
      {
        retryDelay: 1000
      }
    ),
    activePage,
    setActivePage
  };
}

export default useSearchQuery;
