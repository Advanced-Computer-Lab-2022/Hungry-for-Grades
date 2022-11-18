import { type SetStateType } from '../common.types';

export type ControlledStarsRatingProps = {
  rating: number;
  setRating: SetStateType<number>;
};

export type StaticStarsRatingProps = {
  rating: number;
};
