import { ITrainee } from '@/Trainee/trainee.interface';
import { IUser } from '@/User/user.interface';

export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type Review = {
  _trainee: ITrainee;
  comment: string;
  createdAt: Date;
  heading: string;
  rating: number;
};
