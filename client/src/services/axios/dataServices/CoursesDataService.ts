import axios from 'axios';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';

import {
  IAddCourseRequest,
  ICourse,
  ICourseFilters,
  ICourseQuestion,
  Review
} from '@interfaces/course.interface';
import { PaginatedRequest } from '@/interfaces/request.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export const CoursesRoutes = {
  GET: {
    getCSRFToken: {
      URL: '/getCSRFToken' as const,
      params: '',
      query: '',
      payload: {}
    },
    getCoursesSearchFilter: {
      URL: '/courses' as const,
      params: '' as const,
      query: '',
      payload: {}
    },
    getDiscounts: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getCourseReviews: {
      URL: '/courses/rating' as const,
      params: '',
      query: '',
      payload: ''
    }
  }
};

export async function getCourses(
  filter: ICourseFilters
): Promise<PaginatedResponse<ICourse>> {
  const res = await axios.get<PaginatedResponse<ICourse>>(
    `${APP_BASE_API_URL}/courses`,
    {
      params: filter
    }
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data;
}

export function getTopRatedCourses(
  country: string
): Promise<PaginatedResponse<ICourse>> {
  return getCourses({
    page: 1,
    limit: 3,
    sortBy: 1,
    country
  });
}

export async function getCourseByID(
  courseID: string | undefined,
  country: string
): Promise<ICourse | undefined> {
  if (!courseID) {
    return undefined;
  }
  const res = await axios.get<HttpResponse<ICourse>>(
    `${APP_BASE_API_URL}/courses/${encodeURIComponent(courseID)}`,
    {
      params: { country }
    }
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function createCourse(
  course: IAddCourseRequest
): Promise<ICourse> {
  const res = await axios.post<HttpResponse<ICourse>>(
    `${APP_BASE_API_URL}/courses/`,
    course
  );
  if (res.statusText !== 'Created') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function updateCourse(
  course: IAddCourseRequest,
  courseId: string
): Promise<ICourse> {
  const res = await axios.put<HttpResponse<ICourse>>(
    `${APP_BASE_API_URL}/courses/${encodeURIComponent(courseId)}`,
    course
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function deleteCourse(courseId: string): Promise<ICourse> {
  const res = await axios.delete<HttpResponse<ICourse>>(
    `${APP_BASE_API_URL}/courses/${encodeURIComponent(courseId)}`
  );
  if (res.statusText !== 'Accepted') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function getCourseExam(
  courseId: string | undefined
): Promise<ICourseQuestion[] | undefined> {
  if (!courseId) {
    return undefined;
  }
  const res = await axios.get<HttpResponse<ICourseQuestion[]>>(
    `${APP_BASE_API_URL}/courses/${encodeURIComponent(courseId)}/exam`
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function createExam(
  courseId: string | undefined,
  examData: ICourseQuestion[]
): Promise<ICourseQuestion[] | undefined> {
  if (!courseId) {
    return undefined;
  }
  const res = await axios.post<HttpResponse<ICourseQuestion[]>>(
    `${APP_BASE_API_URL}/courses/${encodeURIComponent(courseId)}/exam`,
    examData
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function getCourseReviews(
  courseId: string | undefined,
  props: PaginatedRequest
): Promise<PaginatedResponse<Review> | undefined> {
  if (!courseId) {
    return undefined;
  }
  const res = await axios.get<PaginatedResponse<Review>>(
    `${APP_BASE_API_URL}/courses/rating/${encodeURIComponent(courseId)}`,
    { params: props }
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data;
}
