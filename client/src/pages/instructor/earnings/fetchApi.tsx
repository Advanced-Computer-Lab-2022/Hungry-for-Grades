import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';
import { UseUser } from '@/store/userStore';
import { UseCountry } from '@/store/countryStore';

async function searchRequest(
  instructorId: string,
  year: string,
  country: string
) {
  const instructor = InstructorRoutes.GET.getMonthlyEarnings;
  instructor.URL = `/payment/monthly-revenue/${instructorId}?year=${year}&country=${country}`;
  return getRequest<HttpResponse<number[]>>(instructor);
}

export default function UseSearchQuery(year: string) {
  const user = UseUser();
  const instructorId = user?._id as string;
  const country = UseCountry();

  return {
    ...useQuery(['fetch-revenue-213123', instructorId, year, country], () =>
      searchRequest(instructorId, year, country)
    )
  };
}
