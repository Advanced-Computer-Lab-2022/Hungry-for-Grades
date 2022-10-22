
export interface PaginatedRequest {
  limit: number;
  page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}


