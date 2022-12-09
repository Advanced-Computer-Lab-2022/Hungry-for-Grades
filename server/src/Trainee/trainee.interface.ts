import { ICourse } from '@/Course/course.interface';
import { IUser } from '@/User/user.interface';
import { Types } from 'mongoose';

export interface ITrainee extends IUser {
  _cart?: ICourse[];
  _enrolledCourses?: EnrolledCourse[];
  _lastViewedCourse?: ICourse | Types.ObjectId;
  _wishlist?: ICourse[];
  balance: number;
  creditCards: CreditCard[];
  isCorporate: boolean;
  notes: INote[];
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
  _submittedQuestions: SubmittedQuestion[];
  _visitedLessons?: Types.ObjectId[];
  dateOfCompletion?: Date;
  // null or undefined signifies incomplete (not certified yet)
  dateOfEnrollment: Date;
  examGrade?: number;
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

type CreditCard = {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: Date;
};

export type SubmittedQuestion = {
  _questionId: Types.ObjectId;
  submittedAnswer: string;
};

export interface INote extends INoteData {
  id: string;
}

export interface INoteData {
  courseName?: string;
  lessonId?: string;
  markdown: string;
  tags: ITag[];
  title: string;
}

export interface ITag {
  id: string;
  label: string;
}

export interface IRawNote extends IRawNoteData {
  id: string;
}

export interface IRawNoteData {
  markdown: string;
  tagIds: string[];
  title: string;
}
