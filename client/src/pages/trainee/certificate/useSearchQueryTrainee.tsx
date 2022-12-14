import { useQuery } from '@tanstack/react-query';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';
import { ITrainee } from '@/interfaces/course.interface';

const traineeId = '637969352c3f71696ca34759';

async function searchRequest() {
  const course = TraineeRoutes.GET.getEnrolledCourse;
  course.URL = `/trainee/${traineeId}`;
  return getRequest<HttpResponse<ITrainee>>(course);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-trainee', traineeId], () => searchRequest())
  };
}
