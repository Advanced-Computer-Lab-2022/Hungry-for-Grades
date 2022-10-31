import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';

import { type SelectFiltersType } from './types';

const id = '63545df5507c24fc734f65ee';

async function searchRequest(filters: SelectFiltersType) {
  const Courses = InstructorRoutes.GET.getCourses;
  Courses.params = id;
  Courses.query = `
	&priceLow=${filters.priceLow}
	&priceHigh=${filters.priceHigh}
	&durationLow=${filters.durationLow}
	&durationHigh=${filters.durationHigh}
  &searchTerm=${filters.searchTerm}`;
  return getRequest(Courses);
}
// category: string;
// subcategory: string;
// priceLow: number;
// priceHigh: number;
// sortBy: number;
// country: string;
// durationLow: number;
// durationHigh: number;
// level: string;
// searchTerm: string;

function useSearchQuery(filters: SelectFiltersType) {
  return useQuery(
    ['search-instructor-courses', filters],
    () => searchRequest(filters),
    {
      retryDelay: 1000
    }
  );
}

export default useSearchQuery;
