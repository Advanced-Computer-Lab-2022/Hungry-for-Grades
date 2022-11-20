import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmptyObject, IsObject, IsOptional, IsString, MinLength } from 'class-validator';

import { Gender, Role } from '@/User/user.enum';
import { Address, IUser } from '@User/user.interface';
import { Types } from 'mongoose';

export class CreateUserDto implements IUser {
  @IsOptional()
  lastLogin: Date;

  @IsOptional()
  _id: Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  public active: boolean;

  @IsObject()
  @IsOptional()
  public address: Address;

  @IsDate()
  @IsOptional()
  public createdAt: Date;

  @IsObject()
  @IsNotEmptyObject()
  public email: { address: string; isValidated: boolean };

  @IsEnum(Gender, { message: 'Gender cannot be left empty. Please choose either Male or Female' })
  public gender: Gender;

  public profileImage: string;

  @IsString()
  public username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  public password: string;

  @IsString()
  @IsEnum(Role, { message: 'Choose from: Admin, Trainee or Instructor' })
  public role: Role;

  @IsString()
  public name: string;

  @IsString()
  public phone: string;
}

export class UserLoginDTO {
  @IsObject()
  public email: { address: string };
  @IsString()
  public username: string;
  @IsString()
  public password: string;
}
