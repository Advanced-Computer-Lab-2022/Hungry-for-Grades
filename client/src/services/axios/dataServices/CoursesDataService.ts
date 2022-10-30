import axios from 'axios';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';

import { ICourse, ICourseFilters } from '@interfaces/course.interface';

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
    'http://localhost:3000/api/courses',
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

export function getTopRatedCourses(): Promise<PaginatedResponse<ICourse>> {
  return getCourses({
    page: 1,
    limit: 3,
    sortBy: 1
  });
}

export async function getCourseByID(
  courseID: string | undefined
): Promise<ICourse | undefined> {
  if (!courseID) {
    return undefined;
  }
  const res = await axios.get<HttpResponse<ICourse>>(
    `http://localhost:3000/api/courses/${encodeURIComponent(courseID)}`
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
