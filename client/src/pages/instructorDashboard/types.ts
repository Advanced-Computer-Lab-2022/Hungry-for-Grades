import { Level } from '@/enums/level.enum';
export type SelectFiltersType = {
  category: string;
  subCategory: string;
  searchTerm: string;
  priceLow: number;
  priceHigh: number;
  level: Level | '';
  sortBy: 0 | 1; //0 for Most Viewed or 1 for Most Rated
  country: string;
  durationHigh: number;
};
