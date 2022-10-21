import { Types } from 'mongoose';

export interface Trainee {
  _cart?: cart[];
  _corporate?: Types.ObjectId[];
  _enrolledCourses?: enrolledCourses[];
  _id: Types.ObjectId;
  _wishlist?: wishlist[];
  balance: number;
  creditCard: creditCard[];
  preferredSkills: string[];
}

type cart = {
  _course: Types.ObjectId;
};
type wishlist = {
  _course: Types.ObjectId;
};

type enrolledCourses = {
  _course: Types.ObjectId;
  createdAt: Date;
  notes: notes[];
  reminder: reminder;
  subscribedNotification: boolean;
};

type reminder = {
  date: Date;
  frequency:
    | 'once'
    | 'daily'
    | 'weekly'
    | 'monthly';
  message: string;
  name: string;
  time: string;
};

type notes = {
  createdAt: Date;
  description: string;
  title: string;
};

type creditCard = {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
};
