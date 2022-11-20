import { ICourse } from '@/Course/course.interface';
import { IUser } from '@/User/user.interface';
import { LargeNumberLike } from 'crypto';
import { Types } from 'mongoose';

export interface ITrainee extends IUser {
  _cart?: Cart;
  _enrolledCourses?: EnrolledCourse[];
  _wishlist?: WishList;
  balance: number;
  creditCards: CreditCard[];
  preferredSkills: string[];
}

type Cart = {
  _course: Types.ObjectId[];
};
type WishList = {
  _course: Types.ObjectId[];
};

export type EnrolledCourse = {
  _course: ICourse;
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
