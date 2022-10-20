import { Types } from 'mongoose';
import { Rating } from './common.types';

export interface Courses {
  _corporate?: Types.ObjectId[];
  _id: Types.ObjectId;
  _instructor: Types.ObjectId;
  anouncments: anouncment[];
  caption: string[];
  category: string;
  counpan: coupan[];
  createdAt: Date;
  description: string;
  duration: number;
  frequentlyAskedQuestions: frequentlyAskedQuestions[];
  language: string;
  numberOfEnrolledTrainees: number;
  outline: string[];
  previewVideo: string;
  price: price;
  rating: Rating;
  section: section[];
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

export type coupan = {
  code: string;
  count: number;
  discount: discount;
};
export type discount = {
  endDate: Date;
  percentage: number;
  startDate: Date;
};
