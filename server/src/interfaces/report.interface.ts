import { Types } from 'mongoose';

export enum status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVE = 'resolved',
}

export enum reason {
  FINANCIAL = 'financial',
  OTHER = 'other',
  TECHNICAL = 'technical',
}
export interface Report {
  _course: Types.ObjectId;
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  description: string;
  reason: reason;
  status: status;
}
