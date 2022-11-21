import { useQuery } from '@tanstack/react-query';

import { type SelectFiltersType } from './types';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';

const id = '635d21f7f1f00520bae45867';

async function searchRequest(filters: SelectFiltersType) {
  //Here there was a problem in the postman whenever you pass priceHigh server error
  //So i removed it from the queries once it is done it have to be back
  // &priceHigh=${filters.priceHigh}
  const Courses = InstructorRoutes.GET.getCourses;
  Courses.params = id;
  Courses.query = `
	&priceLow=${filters.priceLow}
	
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
