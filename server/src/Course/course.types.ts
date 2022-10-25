import { PaginatedRequest } from '@/utils/PaginationResponse';
import { Level } from './course.interface';
export interface CourseFilters extends PaginatedRequest {
  category: string;
  durationHigh: number;
  durationLow: number;
  level: Level;
  priceHigh: number;
  priceLow: number;
  searchTerm: string;
  sortBy: number;
  subcategory: string; // 0 for Most Viewed, 1 for Most Rated, -1 don't sort
  country:string
}

export const CourseFiltersDefault: CourseFilters = {
  category: undefined,
  durationHigh: 1000,
  durationLow: 1,
  level: undefined,
  limit: 12,
  page: 1,
  priceHigh: 1e5,
  priceLow: 0,
  searchTerm: '',
  sortBy: -1,
  subcategory: undefined,
  country: 'United States'
};
