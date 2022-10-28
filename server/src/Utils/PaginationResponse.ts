export interface PaginatedRequest {
  limit: number;
  page: number;
}

export interface PaginatedData<T> {
  data: T[];
  message: string;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends PaginatedData<T> {
  message: string;
  success: boolean;
}
