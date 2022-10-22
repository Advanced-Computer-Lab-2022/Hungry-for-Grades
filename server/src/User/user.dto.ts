import { IsEmail, IsString } from 'class-validator';

import { Role } from '@/User/user.interface';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public role: Role;
}
