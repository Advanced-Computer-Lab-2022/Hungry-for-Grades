import { AuthRole } from '@/Authentication/auth.interface';
import { UserRole } from '@/User/user.enum';
import { type Document, Schema, Types } from 'mongoose';

export interface IToken extends Document {
  createdAt: Date;
  token: string;
  userId: Schema.Types.ObjectId;
}

export interface ITokenPayload {
  _id: Types.ObjectId;
  role: AuthRole;
}

export interface ITokenService {
  accessToken: string;
  refreshToken: string;
}
