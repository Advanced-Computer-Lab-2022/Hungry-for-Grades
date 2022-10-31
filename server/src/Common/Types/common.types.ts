import { Types } from 'mongoose';

export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type Review = {
  _user: Types.ObjectId;
  comment: string;
  createdAt: Date;
  rating: number;
};
