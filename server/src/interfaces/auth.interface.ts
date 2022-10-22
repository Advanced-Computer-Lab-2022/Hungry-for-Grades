import { User } from '@/interfaces/user.interface';
import { Request } from 'express';
import { Types } from 'mongoose';

export interface TokenPayload {
  _id: Types.ObjectId;
}

export interface TokenData {
  expiresIn: number;
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
