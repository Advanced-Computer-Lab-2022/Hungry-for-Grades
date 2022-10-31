import { CreateUserDto } from '@/User/user.dto';
import { IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateInstructorDTO extends CreateUserDto {
  @IsOptional()
  public _user: mongoose.Types.ObjectId;
  @IsOptional()
  public speciality: string;
  @IsOptional()
  public title: string;
  @IsOptional()
  public biography: string;
}
