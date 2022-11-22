import { IInstructor } from '@/Instructor/instructor.interface';
import { Rating } from '@Common/Types/common.types';
import { Types } from 'mongoose';

export enum Level {
  ADVANCED = 'Advanced',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
}

export interface ICourse {
  _id: Types.ObjectId;
  _instructor: IInstructor[];
  announcements: Announcement[];
  captions: string[];
  category: string;
  coupouns: Coupon[];
  createdAt: Date;
  description: string;
  duration: number;
  exam: Question[];
  frequentlyAskedQuestions: FrequentlyAskedQuestion[];
  keywords: string[];
  language: string;
  level: Level;
  numberOfEnrolledTrainees: number;
  outline: string[];
  previewVideoURL: string;
  price: Price;
  rating: Rating;
  sections: Section[];
  subcategory: string;
  thumbnail: string;
  title: string;
}

export type FrequentlyAskedQuestion = {
  _id: Types.ObjectId;
  answer: string;
  question: string;
  votes: number;
};

export type Announcement = {
  _id: Types.ObjectId;
  createdAt: Date;
  description: string;
  title: string;
};

export type Price = {
  currency: string;
  currentValue: number;
  discounts: Discount[];
};

export type Exercise = {
  questions: Question[];
  title: string;
};

export type Question = {
  _id: Types.ObjectId;
  answer: string;
  options: string[];
  question: string;
};

export type Section = {
  _id: Types.ObjectId;
  description: string;
  exercises: Exercise[];
  lessons: Lesson[];
  title: string;
};

export type Lesson = {
  _id: Types.ObjectId;
  description: string;
  duration: number;
  title: string;
  videoURL: string;
};

export type Coupon = {
  code: string;
  count: number;
  discount: Discount;
  expiryDate: Date;
};

export type Discount = {
  _id: Types.ObjectId;
  endDate: Date;
  percentage: number;
  startDate: Date;
};

export type Category = {
  name: string;
  subcategories: string[];
};
