export class PaginatedRequest {
  limit = 12;
  page = 1;
}
export interface PaginatedData<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends PaginatedData<T> {
  message: string;
  success: boolean;
}
