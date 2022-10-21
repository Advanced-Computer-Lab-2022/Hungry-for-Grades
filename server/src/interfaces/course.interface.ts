import { Types } from 'mongoose';
import { Rating } from './common.types';

export enum level {
  ADVANCED = 'Advanced',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
}

export interface Course {
  _corporate?: Types.ObjectId[];
  _id: Types.ObjectId;
  _instructor: Types.ObjectId;
  anouncments: anouncment[];
  captions: string[];
  category: string;
  coupouns: coupoun[];
  createdAt: Date;
  description: string;
  duration: number;
  frequentlyAskedQuestions: frequentlyAskedQuestions[];
  keywords: string[];
  language: string;
  level: level;
  numberOfEnrolledTrainees: number;
  outlines: string[];
  previewVideo: string;
  price: price;
  rating: Rating;
  sections: section[];
  subcategory: string;
  thumbnail: string;
  title: string;
}

type frequentlyAskedQuestions = {
  answer: string;
  question: string;
  votes: number;
};

type anouncment = {
  createdAt: Date;
  description: string;
  title: string;
};

type price = {
  currency: string;
  dicounts: [];
  value: number;
};

export type question = {
  _id: Types.ObjectId;
  answer: string;
  options: string[];
  question: string;
};

export type section = {
  description: string;
  excersises: question[];
  lessons: lesson[];
  title: string;
};
export type lesson = {
  description: string;
  duration: number;
  title: string;
  video: string;
};

export type coupoun = {
  code: string;
  count: number;
  discount: discount;
  expiryDate: Date;
};

export type discount = {
  endDate: Date;
  percentage: number;
  startDate: Date;
};
