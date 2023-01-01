import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';

async function searchRequest() {
  const instructorActiveRoute = Object.assign({},InstructorRoutes.GET.getMonthlyEarnings);
  instructorActiveRoute.URL = `/instructor/active`;
  return getRequest<
    HttpResponse<{
      active: number;
      inactive: number;
    }>
  >(instructorActiveRoute);
}

export default function UseDataQuery() {
  return {
    ...useQuery(['admin-instructors-data'], () => searchRequest())
  };
}
