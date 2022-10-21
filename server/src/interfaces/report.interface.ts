import { Types } from 'mongoose';

export enum Status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVE = 'resolved',
}

export enum Reason {
  FINANCIAL = 'financial',
  OTHER = 'other',
  TECHNICAL = 'technical',
}
export interface Report {
  _course: Types.ObjectId;
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  description: string;
  reason: Reason;
  status: Status;
}
