import { useQuery } from '@tanstack/react-query';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';

const traineeId = '637969352c3f71696ca34759';
const courseId = '637a0262301cbd719dff6006';

async function searchRequest() {
  const course = TraineeRoutes.GET.getEnrolledCourse;
  course.URL = `/trainee/${traineeId}/course/${courseId}`;
  return getRequest(course);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-trainee-course', traineeId, courseId], () =>
      searchRequest()
    )
  };
}
