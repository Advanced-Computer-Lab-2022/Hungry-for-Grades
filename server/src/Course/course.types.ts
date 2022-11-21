import { PaginatedRequest } from '@/Utils/PaginationResponse';
import { Level } from './course.interface';
export interface CourseFilters extends PaginatedRequest {
  category: string;
  country: string; // ISO Code
  durationHigh: number;
  durationLow: number;
  level: Level;
  priceHigh: number;
  priceLow: number;
  rating: number;
  searchTerm: string;
  sortBy: number;
  // 0 for Most Purchased, 1 for Most Rated, -1 don't sort
  subcategory: string;
}

export const CourseFiltersDefault: CourseFilters = {
  category: undefined,
  country: 'US',
  durationHigh: 1000,
  durationLow: 1,
  level: undefined,
  limit: 12,
  page: 1,
  priceHigh: 1e18,
  priceLow: 0,
  rating: 0,
  searchTerm: '',
  sortBy: -1,
  subcategory: undefined,
};

export type Category = {
  name: string;
  subcategory: string[];
};
