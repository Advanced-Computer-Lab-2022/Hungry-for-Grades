import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { HttpResponse } from '@/interfaces/response.interface';
import { EnrolledCourse } from '@/interfaces/course.interface';

const traineeId = '637969352c3f71696ca34759';
const courseId = '637a03cf301cbd719dff6039';

async function searchRequest() {
  const course = TraineeRoutes.GET.getEnrolledCourse;
  course.URL = `/trainee/${traineeId}/course/${courseId}`;
  return getRequest<HttpResponse<EnrolledCourse>>(course);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-trainee-course', traineeId, courseId], () =>
      searchRequest()
    )
  };
}
