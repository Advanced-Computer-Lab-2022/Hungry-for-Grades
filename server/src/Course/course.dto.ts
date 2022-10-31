import { Level, Coupon, Announcement, Question, FrequentlyAskedQuestion, Price, Section, Course } from '@Course/course.interface';
import mongoose from 'mongoose';

import { IsArray, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';

export class FrequentlyAskedQuestionDTO {
  answer: string;
  @IsString()
  question: string;
  @IsNumber()
  votes: number;
}

export class AnnouncementDTO {
  @IsDate()
  createdAt: Date;
  @IsString()
  description: string;
  title: string;
}

export class PriceDTO {
  currency: string;
  currentValue: number;
  discounts: DiscountDTO[];
}

export class QuestionDTO {
  answer: string;
  options: string[];
  question: string;
}

export class SectionDTO {
  description: string;
  exercises: Question[];
  lessons: LessonDTO[];
  title: string;
}
export class LessonDTO {
  description: string;
  duration: number;
  title: string;
  videoURL: string;
}

export class CouponDTO {
  code: string;
  count: number;
  discount: DiscountDTO;
  expiryDate: Date;
}

export class DiscountDTO {
  endDate: Date;
  percentage: number;
  startDate: Date;
}

export class CourseDTO {
  @IsString()
  instructorID: string; // One to many is handled for now
  announcements: AnnouncementDTO[];
  captions: string[];
  category: string;
  coupouns: Coupon[];
  description: string;
  @IsNumber()
  duration: number;
  exam: Question[];
  frequentlyAskedQuestions: FrequentlyAskedQuestionDTO[];
  keywords: string[];
  language: string;
  @IsEnum(Level)
  level: Level;
  outline: string[];
  @IsUrl()
  previewVideoURL: string;
  price: PriceDTO;
  sections: Section[];
  subcategory: string;
  @IsUrl()
  thumbnail: string;
  title: string;
}
