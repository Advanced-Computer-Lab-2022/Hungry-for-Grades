import { IUser } from '@User/user.interface';
import { Request } from 'express';
import { type ITokenService } from '@Token/token.interface';

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
  value: ITokenService;
}
