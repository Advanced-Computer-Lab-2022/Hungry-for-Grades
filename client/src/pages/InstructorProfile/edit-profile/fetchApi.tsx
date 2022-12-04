import { useQuery } from '@tanstack/react-query';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';

const instructorId = '637a2160a0fc7dcfe39b4931';

async function searchRequest() {
  const trainee = InstructorRoutes.GET.getInstructor;
  trainee.URL = `/instructor/${instructorId}`;
  return getRequest(trainee);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-instructor', instructorId], () => searchRequest())
  };
}
