import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';
import { UseUser } from '@/store/userStore';
import { UseCountry } from '@/store/countryStore';
import { IUser } from '@/interfaces/user.interface';

async function searchRequest(
  instructorId: string,
  year: string,
  country: string
) {
  const instructor = InstructorRoutes.GET.getMonthlyEarnings;
  instructor.URL = `/payment/monthly-revenue/${instructorId}?year=${year}&country=${country}`;
  return getRequest<HttpResponse<number[]>>(instructor);
}

export default function UseDataQuery(year: string) {
  const user = UseUser() as IUser;
  const instructorId = user?._id;
  const country = UseCountry();

  return {
    ...useQuery(['admin-data', instructorId, year, country], () =>
      searchRequest(instructorId, year, country)
    )
  };
}
