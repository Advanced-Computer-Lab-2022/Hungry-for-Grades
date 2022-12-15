import { ICourse } from '@/Course/course.interface';
import { Role } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import { PaginatedRequest } from '@/Utils/PaginationResponse';
import { isEnum } from 'class-validator';
import { Types } from 'mongoose';

export enum Status {
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  RESOLVED = 'Resolved',
}

export enum Reason {
  COUSE_REQUEST = 'Course_Request',
  FINANCIAL = 'Financial',
  OTHER = 'Other',
  REFUND = 'Refund',
  TECHNICAL = 'Technical',
}
export interface Report {
  _course: ICourse | Types.ObjectId;
  _id: Types.ObjectId;
  _user: IUser | Types.ObjectId;
  createdAt: Date;
  description: string;
  followUp: Message[];
  isSeen: boolean;
  reason: Reason;
  role: Role;
  status: Status;
}

export interface IReportFilters extends PaginatedRequest {
  _course?: string;
  _user?: string;
  endDate?: Date;
  isSeen: string;
  reason?: string|string[];
  sort?: number;
  // 1: ascending, -1: descending , undefined: default (no sort)
  startDate?: Date;
  status?: Status;
}

export interface Message {
  content: string;
  createdAt: Date;
  isAdmin: boolean;
}
