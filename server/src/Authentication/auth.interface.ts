import { IInstructor } from '@/Instructor/instructor.interface';
import { IAdmin } from '@/Admin/admin.interface';
import { ITrainee } from '@/Trainee/trainee.interface';
import { ITokenPayload } from './../Token/token.interface';
import { Request } from 'express';

export interface RequestWithTokenPayload extends Request {
  tokenPayload: ITokenPayload;
}
export interface RequestWithTokenPayloadAndUser extends RequestWithTokenPayload {
  user: ITrainee | IAdmin | IInstructor;
}

export interface ICookie {
  name: string;
  options: {
    httpOnly: boolean;
    maxAge: number;
    sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
  };
  value: string;
}
