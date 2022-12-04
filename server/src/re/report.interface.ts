import { Role } from '@User/user.enum';
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
  _course: Types.ObjectId;
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  description: string;
  reason: Reason;
  role: Role;
  status: Status;
}
