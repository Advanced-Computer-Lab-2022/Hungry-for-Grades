import { Level } from '@enums/level.enum';
export type SelectFiltersType = {
  category: string;
  subCategory: string;
  searchTerm: '';
  paid: boolean;
  free: boolean;
  level: Level | '';
  sortBy: 0 | 1; //0 for Most Viewed or 1 for Most Rated
  durationLow: number;
  durationHigh: number;
};
