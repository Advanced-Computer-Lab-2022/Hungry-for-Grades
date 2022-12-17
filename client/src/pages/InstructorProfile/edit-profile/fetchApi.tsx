import { useQuery } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { IInstructor } from '@/interfaces/instructor.interface';

async function searchRequest(instructorId: string) {
  const instructor = InstructorRoutes.GET.getInstructor;
  instructor.URL = `/instructor/${instructorId}`;
  return getRequest<AxiosResponse<IInstructor>>(instructor);
}

export default function useSearchQuery(instructorId: string) {
  return {
    ...useQuery(['search-instructor', instructorId], () =>
      searchRequest(instructorId)
    )
  };
}
