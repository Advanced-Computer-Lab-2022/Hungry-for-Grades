import { Level, Coupon, Announcement, Question, FrequentlyAskedQuestion, Price, Section } from '@Course/course.interface';
import { Rating } from '@Common/Types/common.types';

export interface CourseDTO {
  _instructor: string[];
  announcements: Announcement[];
  captions: string[];
  category: string;
  coupouns: Coupon[];
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
