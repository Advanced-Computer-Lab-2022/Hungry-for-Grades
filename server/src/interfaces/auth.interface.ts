import { User } from '@interfaces/users.interface';
import { Request } from 'express';

export interface TokenPayload {
  _id: string;
}

export interface TokenData {
  expiresIn: number;
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
