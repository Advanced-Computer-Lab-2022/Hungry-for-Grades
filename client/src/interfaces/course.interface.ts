import { PaginatedRequest } from './request.interface';

import {
  Address,
  CreditCard,
  IUser,
  Note,
  Reminder,
  SubmittedQuestion
} from '@/interfaces/user.interface';

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
  _trainee: ITrainee;
  comment: string;
  createdAt: Date;
  rating: number;
};
export type ICourseReview = {
  _traineeId: string;
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
  _id?: string;
  description: string;
  duration: number;
  title: string;
  videoURL: string;
};

export type ICourseQuestion = {
  _id?: string;
  answer: string;
  options: string[];
  question: string;
};

export type ICourseExercise = {
  _id?: string | undefined;
  title: string;
  numberOfQuestions: number;
  questions: ICourseQuestion[];
};

export type ICourseSection = {
  _id?: string;
  description: string;
  lessons: ICourseLesson[];
  exercises: ICourseExercise[];
  title: string;
};

export type EnrolledCourse = {
  _course: ICourse;
  _submittedQuestions: SubmittedQuestion[];
  _visitedLessons?: string[];
  dateOfCompletion?: Date;
  // null or undefined signifies incomplete (not certified yet)
  dateOfEnrollment: Date;
  examGrade?: number;
  notes?: Note[];
  progress?: number;
  reminder?: Reminder;
  subscribedNotification?: boolean;
};

export interface ITrainee extends IUser {
  _cart?: ICourse[];
  _enrolledCourses?: EnrolledCourse[];
  _lastViewedCourse?: ICourse | string;
  _wishlist?: ICourse[];
  balance: number;
  creditCards: CreditCard[];
  preferredSkills: string[];
}

export { type ICourseFilters };
