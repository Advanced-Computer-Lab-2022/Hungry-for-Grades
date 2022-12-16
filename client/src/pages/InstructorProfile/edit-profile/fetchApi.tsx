import { useQuery } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { IInstructor } from '@/interfaces/instructor.interface';

const instructorId = '637a2160a0fc7dcfe39b4931';

async function searchRequest() {
  const instructor = InstructorRoutes.GET.getInstructor;
  instructor.URL = `/instructor/${instructorId}`;
  return getRequest<AxiosResponse<IInstructor>>(instructor);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-instructor', instructorId], () => searchRequest())
  };
}
