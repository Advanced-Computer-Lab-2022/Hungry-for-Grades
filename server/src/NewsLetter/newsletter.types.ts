import { type PaginatedRequest } from '@/Utils/PaginationResponse';
export interface INewsLetterFilters extends PaginatedRequest {
  email: string;
  role: string;
  sortBy: -1 | 1;
  all: 1 | 0;
}
