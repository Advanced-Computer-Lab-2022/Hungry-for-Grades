import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { HttpResponse } from '@/interfaces/response.interface';
import { EnrolledCourse } from '@/interfaces/course.interface';

async function searchRequest(traineeId: string, courseId: string) {
  const course = TraineeRoutes.GET.getEnrolledCourse;
  course.URL = `/trainee/${traineeId}/course/${courseId}`;
  console.log(course);
  return getRequest<HttpResponse<EnrolledCourse>>(course);
}

export default function useSearchQuery(traineeId: string, courseId: string) {
  return {
    ...useQuery(['search-trainee-coursee', traineeId, courseId], () =>
      searchRequest(traineeId, courseId)
    )
  };
}
