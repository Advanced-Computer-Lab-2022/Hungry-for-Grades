import { Types } from 'mongoose';

export enum Status {
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  RESOLVE = 'Resolved',
}

export enum Reason {
  FINANCIAL = 'Financial',
  OTHER = 'Other',
  TECHNICAL = 'Technical',
}
export interface Report {
  _course: Types.ObjectId;
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  description: string;
  reason: Reason;
  status: Status;
}
