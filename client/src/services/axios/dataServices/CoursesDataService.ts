import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from '../http-verbs';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';

import {
  IAddCourseRequest,
  ICourse,
  ICourseFilters,
  ICourseLesson,
  ICourseQuestion,
  ICourseSection,
  Review
} from '@interfaces/course.interface';

import { PaginatedRequest } from '@/interfaces/request.interface';

export function createQueryString(params: unknown): string {
  if (!params) {
    return '';
  }
  let result = '';
  for (const key in params) {
    if (!params.hasOwnProperty(key)) {
      continue;
    }
    const val = (params as Record<string, unknown>)[key];
    if (typeof val === 'string') {
      result +=
        (result.length === 0 ? '' : '&') +
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(val);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      result +=
        (result.length === 0 ? '' : '&') +
        encodeURIComponent(key) +
        '=' +
        val.toString();
    }
  }
  return result;
}

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
    },
    getCourses: {
      URL: '/courses' as const,
      params: '',
      query: '',
      payload: ''
    },
    getCourseById: {
      URL: '/courses' as const,
      params: '',
      query: '',
      payload: ''
    },
    getCourseExam: {
      URL: '',
      params: '',
      query: '',
      payload: ''
    },
    getSectionById: {
      URL: '',
      params: '',
      query: '',
      payload: ''
    },
    getLessonById: {
      URL: '',
      params: '',
      query: '',
      payload: ''
    }
  },
  POST: {
    createCourse: {
      URL: '/courses' as const,
      params: '',
      query: '',
      payload: {} as IAddCourseRequest
    },
    createExam: {
      URL: '',
      params: '',
      query: '',
      payload: {} as ICourseQuestion[]
    }
  },
  PUT: {
    updateCourse: {
      URL: 'courses' as const,
      params: '',
      query: '',
      payload: {} as IAddCourseRequest
    }
  },
  DELETE: {
    deleteCourse: {
      URL: 'courses' as const,
      params: '',
      query: '',
      payload: {}
    }
  }
};

export async function getCourses(
  filter: ICourseFilters
): Promise<PaginatedResponse<ICourse>> {
  const courses = CoursesRoutes.GET.getCourses;
  courses.query = createQueryString(filter);
  const res = await getRequest<PaginatedResponse<ICourse>>(courses);
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
): Promise<ICourse | null> {
  if (!courseID) {
    return null;
  }
  const courseById = CoursesRoutes.GET.getCourseById;
  courseById.params = encodeURIComponent(courseID);
  courseById.query = createQueryString({ country });

  const res = await getRequest<HttpResponse<ICourse>>(courseById);
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
): Promise<ICourse | null> {
  if (!course) {
    return null;
  }
  const newCourse = CoursesRoutes.POST.createCourse;
  newCourse.payload = course;
  const res = await postRequest<HttpResponse<ICourse>>(newCourse);
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
): Promise<ICourse | null> {
  if (!course || !courseId) {
    return null;
  }
  const updatedCourse = CoursesRoutes.PUT.updateCourse;
  updatedCourse.params = encodeURIComponent(courseId);
  updatedCourse.payload = course;
  const res = await putRequest<HttpResponse<ICourse>>(updatedCourse);
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function deleteCourse(courseId: string): Promise<ICourse | null> {
  if (!courseId) {
    return null;
  }
  const deletedCourse = CoursesRoutes.DELETE.deleteCourse;
  deletedCourse.params = encodeURIComponent(courseId);
  const res = await deleteRequest<HttpResponse<ICourse>>(deletedCourse);
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
): Promise<ICourseQuestion[] | null> {
  if (!courseId) {
    return null;
  }
  const courseExam = CoursesRoutes.GET.getCourseExam;
  courseExam.URL = `/courses/${encodeURIComponent(courseId)}/exam`;

  const res = await getRequest<HttpResponse<ICourseQuestion[]>>(courseExam);
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
): Promise<ICourseQuestion[] | null> {
  if (!courseId) {
    return null;
  }
  const newExam = CoursesRoutes.POST.createExam;
  newExam.URL = `/courses/${encodeURIComponent(courseId)}/exam`;
  newExam.payload = examData;
  const res = await postRequest<HttpResponse<ICourseQuestion[]>>(newExam);
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
): Promise<PaginatedResponse<Review> | null> {
  if (!courseId) {
    return null;
  }
  const courseReviews = CoursesRoutes.GET.getCourseReviews;
  courseReviews.params = encodeURIComponent(courseId);
  courseReviews.query = createQueryString(props);
  const res = await getRequest<PaginatedResponse<Review>>(courseReviews);
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data;
}

export async function getSectionById(
  courseId: string | undefined,
  sectionId: string | undefined
): Promise<ICourseSection | null> {
  if (!courseId || !sectionId) {
    return null;
  }
  const courseSection = CoursesRoutes.GET.getSectionById;
  courseSection.URL = `/courses/${encodeURIComponent(
    courseId
  )}/section/${encodeURIComponent(sectionId)}`;
  const res = await getRequest<HttpResponse<ICourseSection>>(courseSection);
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function getLessonById(
  courseId: string | undefined,
  lessonId: string | undefined,
  userId: string | undefined
): Promise<ICourseLesson | null> {
  if (!courseId || !lessonId || !userId) {
    return null;
  }
  const courseLesson = CoursesRoutes.GET.getLessonById;
  courseLesson.URL = `/courses/${encodeURIComponent(
    courseId
  )}/lesson/${encodeURIComponent(lessonId)}/user/${encodeURIComponent(userId)}`;
  const res = await getRequest<HttpResponse<ICourseLesson>>(courseLesson);
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
