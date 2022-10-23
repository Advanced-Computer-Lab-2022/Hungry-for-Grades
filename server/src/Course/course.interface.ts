import { Types } from 'mongoose';
import { Rating } from '@Common/Types/common.types';

export enum Level {
  ADVANCED = 'Advanced',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
}

export interface Course {
  _corporate?: Types.ObjectId[];
  _id: Types.ObjectId;
  _instructor: Types.ObjectId[];
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
  answer: string;
  question: string;
  votes: number;
};

export type Announcement = {
  createdAt: Date;
  description: string;
  title: string;
};

export type Price = {
  currency: string;
  currentValue: number;
  dicounts: Discount[];
};

export type Question = {
  _id: Types.ObjectId;
  answer: string;
  options: string[];
  question: string;
};

export type Section = {
  description: string;
  excersises: Question[];
  lessons: Lesson[];
  title: string;
};
export type Lesson = {
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
  endDate: Date;
  percentage: number;
  startDate: Date;
};
