import { useQuery } from '@tanstack/react-query';

import { ICourse } from '@/interfaces/course.interface';

import { getRequest } from '@/services/axios/http-verbs';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';

async function searchRequest() {
	const getCoursesSearchFilter = Object.assign(
    {},
    CoursesRoutes.GET.getCoursesSearchFilter
  );
  const searchQuery = `
	&limit=${5}
	&page=${1}
	&sortBy=${0}
	`.trim();
  getCoursesSearchFilter.query = searchQuery;
  return getRequest<PaginatedResponse<ICourse>>(getCoursesSearchFilter);
}

export default function UseDataAnalyticsQuery() {
  return {
    ...useQuery(['admin-trainee-courses-analytics-data'], () => searchRequest())
  };
}
