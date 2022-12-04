import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmptyObject,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

import { Gender } from '@/User/user.enum';
import { IUser } from '@User/user.interface';
import { Types } from 'mongoose';

export class UserDTO implements IUser {
  @IsOptional()
  lastLogin: Date;

  @IsOptional()
  _id: Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  public active: boolean;

  // @IsObject()
  // @IsOptional()
  // public address: Address;

  @IsDate()
  @IsOptional()
  public createdAt: Date;

  @IsObject()
  @IsNotEmptyObject()
  public email: { address: string; isVerified: boolean };

  @IsEnum(Gender, { message: 'Gender cannot be left empty. Please choose either Male or Female' })
  public gender: Gender;

  public profileImage: string;

  @IsString()
  public username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  public password: string;

  // @IsString()
  // @IsEnum(Role, { message: 'Choose from: Admin, Trainee or Instructor' })
  // public role: Role;
  public country: string;

  @IsDate()
  public dateOfBirth: Date;

  @IsString()
  public name: string;

  @IsPhoneNumber()
  public phone: string;

  public isCorporate: boolean;
}

export class UserLoginDTO {
  @IsObject()
  public email: { address: string };
  @IsString()
  public username: string;
  @IsString()
  public password: string;
}
