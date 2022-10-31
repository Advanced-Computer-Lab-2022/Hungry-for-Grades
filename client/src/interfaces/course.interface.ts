import { PaginatedRequest } from './request.interface';

import { IUser } from '@/interfaces/user.interface';

import { Level } from '@/enums/level.enum';

interface ICourseFilters extends PaginatedRequest {
  category?: string;
  country?: string;
  durationHigh?: number;
  durationLow?: number;
  level?: Level;
  priceHigh?: number;
  priceLow?: number;
  searchTerm?: string;
  sortBy?: number; // 0 for Most Viewed, 1 for Most Rated, -1 don't sort
  subcategory?: string;
}

interface IBaseCourse {
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
  duration: number;
  outline: string[];
  sections: CourseSection[];
}

export interface IAddCourseRequest extends IBaseCourse {
  instructorID: string;
}

export interface ICourse extends IBaseCourse {
  _id: string;
  _instructor: Instructor | Instructor[];
  numberOfEnrolledTrainees: number;
  rating: Rating;
}

export type CourseDiscount = {
  endDate: Date;
  percentage: number;
  startDate: Date;
};

export type Price = {
  currency: string;
  currentValue: number;
  discounts: Array<CourseDiscount>;
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

export type Instructor = {
  _user: IUser[] | IUser;
};

export type CourseLesson = {
  description: string;
  duration: number;
  title: string;
  videoURL: string;
};

export type CourseExercise = {
  answer: string;
  options: string[];
  question: string;
};

export type CourseSection = {
  description: string;
  lessons: CourseLesson[];
  exercises: CourseExercise[];
  title: string;
};

export { type ICourseFilters };
