import { ICourse, Rating, SocialMedia } from './course.interface';
import { IUser } from './user.interface';

export type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchAddress: string;
  branchName: string;
  swiftCode: string;
};

export interface ITeachedCourse {
  _course: ICourse;
  earning: number;
}

export interface IInstructor extends IUser {
  _teachedCourses: ITeachedCourse[];
  balance: number;
	currency:string;
  bankAccount: BankAccount;
  biography: string;
  rating: Rating;
  socialMedia: SocialMedia;
  speciality: string;
  title: string;
  email: {
    address: string;
    isValidated: boolean;
  };
}
