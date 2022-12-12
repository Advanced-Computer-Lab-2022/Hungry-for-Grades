import { ICourse, Rating, SocialMedia } from './course.interface';
import { IUser } from './user.interface';

type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchAddress: string;
  branchName: string;
  swiftCode: string;
};

export interface Note extends NoteData {
  id: string;
}

export interface NoteData {
  title: string;
  tags: Tag[];
  markdown: string;
}

export interface Tag {
  label: string;
}

export interface RawNote extends RawNoteData {
  id: string;
}

export interface RawNoteData {
  title: string;
  markdown: string;
  tagLabels: string[];
}

export interface ITeachedCourse {
  _course: ICourse;
  earning: number;
}

export interface IInstructor extends IUser {
  _teachedCourses: ITeachedCourse[];
  balance: number;
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
