import { ICourse } from './course.interface';
import { IUser } from './user.interface';

import { Role } from '@/enums/role.enum';

export type Report = {
  _course: ICourse;
  _id: string;
  _user: IUser;
  description: string;
  reason: Reason;
  role: Role;
  status: Status;
};

export type ReportDTO = {
  _course: string;
  _user: string;
  description: string;
  reason: Reason;
  status: Status;
};

export interface Message {
  content: string;
  createdAt: Date;
  isAdmin: boolean;
}

export type AllReport = {
  _course: ICourse[];
  _id: string;
  traineeInfo: IUser[];
  instructorInfo: IUser[];
  description: string;
  reason: Reason;
  role: Role;
  status: Status;
  createdAt: Date;
  followUp: Message[];
};

export enum Status {
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  RESOLVED = 'Resolved'
}

export enum Reason {
  COUSE_REQUEST = 'Course_Request',
  FINANCIAL = 'Financial',
  OTHER = 'Other',
  REFUND = 'Refund',
  TECHNICAL = 'Technical'
}

export type FilterAdmin = {
  att: FilterElement[];
};

export type FilterElement = {
  values: string[];
  setValue: (x: string) => void;
  actualValue: string;
  title: string;
};
