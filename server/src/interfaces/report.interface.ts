import { Types } from 'mongoose';

enum status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVE = 'resolved',
}

enum reason {
  BUG = 'bug',
  FEATURE = 'feature',
  FINANCIAL = 'financial',
  OTHER = 'other',
  TECHNICAL = 'technical',
}
export interface Report {
  _course: Types.ObjectId;
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  createdAt: Date;
  description: string;
  reason: reason;
  status: status;
}
