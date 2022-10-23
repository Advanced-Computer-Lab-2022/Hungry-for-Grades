import { IsAlpha, IsBoolean, IsDate, IsEnum, IsNotEmptyObject, IsObject, IsString, MinLength } from 'class-validator';

import { Gender, Role } from '@/User/user.enum';
import { Types } from 'mongoose';
import { IUser } from './user.interface';

export class CreateUserDto implements IUser {
  lastLogin: Date;
  _corporate?: Types.ObjectId;
  _id: Types.ObjectId;
  _instructor?: Types.ObjectId;
  _trainee?: Types.ObjectId;

  @IsBoolean()
  public active: boolean;

  @IsObject()
  public address: { city: string; country: string };

  @IsDate()
  public createdAt: Date;

  @IsObject()
  @IsNotEmptyObject()
  public email: { address: string; isValidated: boolean };

  @IsEnum(Gender, { message: 'male or female' })
  public gender: Gender;

  public profileImage: string;

  @IsString()
  username: string;

  @IsNotEmptyObject()
  public Address: { city: string; country: string };

  @IsString({ message: 'password is invalid' })
  @MinLength(8, { message: 'password is too short' })
  public password: string;

  @IsString()
  @IsEnum(Role)
  public role: Role;

  @IsString()
  @IsAlpha()
  public name: string;

  @IsString()
  public phone: string;
}

export class FindUserDto {
  @IsObject({ message: 'email is object' })
  @IsNotEmptyObject()
  public email: {
    address: string;
  };

  @IsString({ message: 'password is invalid' })
  public password: string;
}
