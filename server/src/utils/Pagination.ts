export interface PaginatedRequest {
  limit: number;
  page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  message: string;
  page: number;
  pageSize: number;
  success: boolean;
  totalPages: number;
}
