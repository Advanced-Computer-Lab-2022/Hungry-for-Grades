import { ICourse } from '@/Course/course.interface';
import { CreateUserDto } from '@/User/user.dto';
import { PaginatedData } from '@/Utils/PaginationResponse';
import { IsOptional } from 'class-validator';

export class CreateTraineeDTO extends CreateUserDto {}

export interface CartDTO extends PaginatedData<ICourse> {
  totalCost: number;
}

export interface WishlistDTO extends PaginatedData<ICourse> {
  totalCost: number;
}
