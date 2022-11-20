import { ITrainee } from '@/Trainee/trainee.interface';

export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type Review = {
  _trainee: ITrainee;
  comment: string;
  createdAt: Date;
  rating: number;
};
