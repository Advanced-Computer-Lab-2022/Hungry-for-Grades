import { PaginatedRequest } from './request.interface';

import { Address } from '@/interfaces/user.interface';

import { Level } from '@/enums/level.enum';

//import { PaginatedResponse } from './response.interface';

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
  price: IPrice;
  subcategory: string[];
  thumbnail: string;
  title: string;
  duration: number;
  outline: string[];
  sections: ICourseSection[];
}

export interface IAddCourseRequest extends IBaseCourse {
  instructorID: string;
}

export interface ICourse extends IBaseCourse {
  _id: string;
  _instructor: Instructor[];
  numberOfEnrolledTrainees: number;
  rating: Rating;
}

export type CourseDiscount = {
  endDate: Date;
  percentage: number;
  startDate: Date;
};

export type IPrice = {
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

export type Email = {
  address: string;
  isValidated: boolean;
  _id: string;
};

export type SocialMedia = {
  facebook: string;
  github: string;
  linkin: string;
  personalWebsite: string;
  youtube: string;
  _id: string;
};

export type Instructor = {
  _id: string;
  name: string;
  profileImage: string;
  address: Address;
  email: Email;
  biography: string;
  balance: number;
  active: boolean;
  bankAccount: {
    _id: string;
  };
  socialMedia: SocialMedia;
  speciality: string;
  title: string;
  username: string;
  phone: string;
  gender: string;
  __v: string;
  lastLogin: string;
};

export type ICourseLesson = {
  description: string;
  duration: number;
  title: string;
  videoURL: string;
};

export type ICourseQuestion = {
  answer: string;
  options: string[];
  question: string;
};

export type ICourseExercise = {
  title: string;
  numberOfQuestions: number;
  questions: ICourseQuestion[];
};

export type ICourseSection = {
  description: string;
  lessons: ICourseLesson[];
  exercises: ICourseExercise[];
  title: string;
};

export { type ICourseFilters };
