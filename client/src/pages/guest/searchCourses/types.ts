import { Level } from '@/enums/level.enum';
export type SelectFiltersType = {
  category: string;
  subCategory: string;
  searchTerm: string;
  paid: boolean;
  free: boolean;
  level: Level | '';
  sortBy: 0 | 1; //0 for Most Viewed or 1 for Most Rated
  country: string;
  durationLow: number;
  durationHigh: number;
  rating: number;
  min: number;
  max: number;
};
