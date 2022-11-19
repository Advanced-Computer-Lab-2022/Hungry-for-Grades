import { IUser } from '@/User/user.interface';

export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type Review = {
  _user: IUser;
  comment: string;
  createdAt: Date;
  rating: number;
};
