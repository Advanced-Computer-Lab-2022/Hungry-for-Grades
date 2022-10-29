import axios from 'axios';

import {
  HttpResponse,
  PaginatedResponse
} from '@interfaces/response.interface';

import { PaginatedRequest } from '@interfaces/request.interface';

import { Level } from '@enums/level.enum';

export type CourseFilters = {
  category?: string;
  country?: string;
  durationHigh?: number;
  durationLow?: number;
  level?: Level;
  priceHigh?: number;
  priceLow?: number;
  searchTerm?: string;
  sortBy: number; // 0 for Most Viewed, 1 for Most Rated, -1 don't sort
  subcategory?: string;
} & PaginatedRequest;

export type Price = {
  currency: string;
  currentValue: number;
  discounts: Array<{ endDate: Date; percentage: number; startDate: Date }>;
};
export type Review = {
  userID: string;
  comment: string;
  createdAt: Date;
  rating: number;
};
export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type User = {
  _id: string;
  name: string;
};
export type Instructor = {
  _user: User[];
};
export type CourseSection = {
  description: string;
  lessons: {
    description: string;
    duration: number;
    title: string;
    videoURL: string;
  }[];
  exercises: {
    answer: string;
    options: string[];
    question: string;
  }[];
  title: string;
};
export type Course = {
  _id: string;
  _instructor: Instructor;
  captions: string[];
  category: string;
  description: string;
  keywords: string[];
  language: string;
  level: Level;
  previewVideoURL: string;
  price: Price;
  subcategory: string[];
  thumbnail: string;
  title: string;
  numberOfEnrolledTrainees: number;
  duration: number;
  rating: Rating;
  outline: string[];
  sections: CourseSection[];
};

export async function getCourses(
  filter: CourseFilters
): Promise<PaginatedResponse<Course>> {
  const res = await axios.get<PaginatedResponse<Course>>(
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

export function getTopRatedCourses(): Promise<PaginatedResponse<Course>> {
  return getCourses({
    page: 1,
    limit: 3,
    sortBy: 1
  });
}

export async function getCourseByID(
  courseID: string | undefined
): Promise<Course | undefined> {
  if (!courseID) {
    return undefined;
  }
  const res = await axios.get<HttpResponse<Course>>(
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

export const CoursesRoutes = {
  GET: {
    getCSRFToken: {
      URL: '/getCSRFToken' as const,
      params: '',
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
      URL: '/courses/' as const,
      params:
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
