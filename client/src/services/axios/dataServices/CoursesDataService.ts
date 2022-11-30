import axios from 'axios';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';

import {
  IAddCourseRequest,
  ICourse,
  ICourseFilters,
  ICourseQuestion
} from '@interfaces/course.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export const CoursesRoutes = {
  GET: {
    getCSRFToken: {
      URL: '/getCSRFToken' as const,
      params: '',
      query: '',
      payload: {},
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    },
    getCoursesSearchFilter: {
      URL: '/courses' as const,
      params: '' as const,
      query:
        '?priceLow=6&priceHigh=10000&page=&limit=12&searchTerm=learn&country=Egypt',
      payload: {},
      response: {
        data: [
          {
            _id: '',
            _instructor: {
              _user: [
                {
                  _id: '',
                  name: ''
                }
              ]
            },
            captions: [''],
            category: '',
            description: '',
            keywords: [''],
            language: '',
            level: '',
            previewVideoURL: '',
            price: {
              currency: 'EGP',
              currentValue: 0,
              discounts: [
                {
                  startDate: '',
                  endDate: '',
                  percentage: 0
                },
                {
                  startDate: '',
                  endDate: '',
                  percentage: 30
                }
              ]
            },
            subcategory: [''],
            thumbnail: '',
            title: '',
            numberOfEnrolledTrainees: 0,
            duration: 3,
            rating: {
              averageRating: 5
            }
          }
        ],
        message: 'Completed Successfully',
        page: 1,
        pageSize: 1,
        success: true,
        totalPages: 1
      }
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
  if (res.statusText !== 'Updated') {
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
  if (res.statusText !== 'Deleted') {
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
): Promise<ICourseQuestion[]> {
  if (!courseId) {
    return [];
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
