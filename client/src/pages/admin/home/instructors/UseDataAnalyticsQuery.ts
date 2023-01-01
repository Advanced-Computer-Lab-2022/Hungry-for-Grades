import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';
import {  PaginatedResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

async function searchRequest() {
  const getTopInstructors = Object.assign(
    {},
    InstructorRoutes.GET.getTopInstructors
  );
  const searchQuery = `
	&limit=${5}
	&page=${1}
	`.trim();
  getTopInstructors.query = searchQuery;
  return getRequest<
    PaginatedResponse<IInstructor>
  >(getTopInstructors);
}

export default function UseDataAnalyticsQuery() {
  return {
    ...useQuery(['admin-instructor-analytics-data'], () => searchRequest())
  };
}
