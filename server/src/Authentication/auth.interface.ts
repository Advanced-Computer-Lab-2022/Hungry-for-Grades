import { IUser } from '@User/user.interface';
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
  user: IUser;
}

export interface ICookie {
  name: string;
  options: {
    httpOnly: boolean;
    maxAge: number;
    secure?: boolean;
  };
  value: string;
}
