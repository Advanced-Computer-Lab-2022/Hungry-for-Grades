import { Rating } from '@/Common/Types/common.types';
import { CreateUserDto } from '@/User/user.dto';
import { IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateInstructorDTO extends CreateUserDto {
  @IsOptional()
  public speciality: string;
  @IsOptional()
  public title: string;
  @IsOptional()
  public biography: string;
  @IsOptional()
  public rating: Rating;
}
