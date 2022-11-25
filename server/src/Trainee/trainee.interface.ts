import { ICourse, Lesson } from '@/Course/course.interface';
import { IUser } from '@/User/user.interface';
import { Types } from 'mongoose';

export interface ITrainee extends IUser {
  _cart?: ICourse[];
  _enrolledCourses?: EnrolledCourse[];
  _lastViewedCourse?: ICourse;
  _wishlist?: ICourse[];
  balance: number;
  creditCards: CreditCard[];
  preferredSkills: string[];
}

export type Cart = {
  _course: ICourse[];
};
export type Wishlist = {
  _course: ICourse[];
};

export type EnrolledCourse = {
  _course: ICourse;
  _visitedLessons?: Types.ObjectId[];
  dateOfCompletion?: Date;
  // null or undefined signifies incomplete (not certified yet)
  dateOfEnrollment: Date;
  examGrade?: number;
  notes?: Note[];
  progress?: number;
  reminder?: Reminder;
  subscribedNotification?: boolean;
};

type Reminder = {
  date: Date;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  message: string;
  name: string;
  time: string;
};

type Note = {
  content: string;
  createdAt: Date;
  title: string;
};

type CreditCard = {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: Date;
};
