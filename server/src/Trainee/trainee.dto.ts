import { CreateUserDto } from '@/User/user.dto';
import { IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTraineeDTO extends CreateUserDto {
  @IsOptional()
  public _user: mongoose.Types.ObjectId;
}
