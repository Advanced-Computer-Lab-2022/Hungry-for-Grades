import { ICourse } from '@/Course/course.interface';
import { Role } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import { PaginatedRequest } from '@/Utils/PaginationResponse';
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
  _course: ICourse;
  _id: Types.ObjectId;
  _user: IUser;
  dateIssued: Date;
  description: string;
  reason: Reason;
  role: Role;
  status: Status;
}

export type ReportDTO = {
  _course: string;
  _user: string;
  description: string;
  reason: Reason;
  status: Status;
};

export interface IReportFilters extends PaginatedRequest {
  _course?: string;
  _user?: string;
  endDate?: Date;
  reason?: Reason;
  startDate?: Date;
  status?: Status;
}
