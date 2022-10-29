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

interface ICourse {
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
}

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

export type Instructor = {
  _user: IUser[];
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

export { type ICourseFilters, type ICourse };
