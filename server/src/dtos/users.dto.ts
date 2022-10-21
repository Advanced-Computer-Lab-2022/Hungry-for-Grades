import { IsEmail, IsString } from 'class-validator';

import { Role } from '@/interfaces/user.interface';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  role: Role;
}
