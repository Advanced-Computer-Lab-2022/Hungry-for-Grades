import { ICourse } from '@/Course/course.interface';
import { UserDTO as UserDTO } from '@/User/user.dto';
import { PaginatedData } from '@/Utils/PaginationResponse';

export class TraineeDTO extends UserDTO {
  isCorporate: boolean;
}

export interface CartDTO extends PaginatedData<ICourse> {
  totalCost: number;
}

export interface WishlistDTO extends PaginatedData<ICourse> {
  totalCost: number;
}
