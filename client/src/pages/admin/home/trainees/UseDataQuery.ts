import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';

async function searchRequest() {
  const traineeActiveRoute = Object.assign(
    {},
    InstructorRoutes.GET.getMonthlyEarnings
  );
  traineeActiveRoute.URL = `/trainee/active`;
  return getRequest<
    HttpResponse<{
      active: number;
      inactive: number;
    }>
  >(traineeActiveRoute);
}

export default function UseDataQuery() {
  return {
    ...useQuery(['admin-trainee-data'], () => searchRequest())
  };
}
