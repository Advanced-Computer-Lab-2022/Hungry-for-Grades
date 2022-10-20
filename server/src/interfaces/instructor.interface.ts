import { Types } from 'mongoose';
import { Rating } from './common.types';

export interface Instructor {
  _corporate?: Types.ObjectId[];
  _id: Types.ObjectId;
  _teachedCourses: Types.ObjectId[];
  balance: number;
  bankAccount: bankAccount;
  biography: string;
  rating: Rating;
  socialMedia: socialMedia;
  speciality: string;
  title: string;
}

type bankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchAddress: string;
  branchName: string;
  swiftCode: string;
};

type socialMedia = {
  facebook: string;
  github: string;
  linkedin: string;
  personalWebsite: string;
  twitter: string;
};
