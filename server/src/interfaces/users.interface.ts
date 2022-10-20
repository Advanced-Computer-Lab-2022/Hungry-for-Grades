import { Types } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  TRAINEE = 'trainee',
  CORPORATE = 'corporate',
}

export interface User {
  _id: Types.ObjectId;
  email: {
    address: string;
    validated: boolean;
  };
  profileImage: string;
  userName: string;
  name: string;
  gender: 'Male' | 'Female';
  role: Role;
  address: {
    city: string;
    country: string;
  };
  phone: string;
  password: string;
  date: Date;
  _instructor?: string;
  _trainee?: string;
  createdAt: Date;
  active: boolean;
}

export interface UserDto {
  email: string;
  password: string;
  role: Role;
}

export interface Instructor {
  _id: Types.ObjectId;
  title: string;
  speciality: string;
  balance: number;
  biography: string;
  rating: Rating;
  socialMedia: {
    github: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    personalWebsite: string;
  };
  bankAccount: bankAccount;
  _teachedCourses: Types.ObjectId[];
  _corporate?: Types.ObjectId[];
}

export interface Trainee {
  _id: Types.ObjectId;
  balance: number;
  creditCard: creditCard[];
  _enrolledCourses?: Types.ObjectId[];
  _corporate?: Types.ObjectId[];
}

export interface Courses {
  _id: Types.ObjectId;
  title: string;
  previewVideo: string;
  thumbnail: string;
  outline: string[];
  caption: string[];
  counpan: coupan[];
  language: string;
  description: string;
  price: {
    value: number;
    currency: string;
    dicounts: [];
  };
  rating: Rating;
  category: string;
  numberOfEnrolledTrainees: number;
  duration: number;
  createdAt: Date;
  _instructor: Types.ObjectId;
  _corporate?: Types.ObjectId[];
}
export type coupan = {
  code: string;
  discount: discount;
  count: number;
};
export type discount = {
  percentage: number;
  startDate: Date;
  endDate: Date;
};

export type Rating = {
  overallRating: number;
  reviews: Review[];
};
export type Review = {
  rating: number;
  comment: string;
  createdAt: Date;
  _user: string;
};

export type creditCard = {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
};

export type bankAccount = {
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
  branchName: string;
  branchAddress: string;
  swiftCode: string;
};
