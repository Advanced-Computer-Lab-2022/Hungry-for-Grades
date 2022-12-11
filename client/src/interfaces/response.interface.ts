interface PaginatedResponse<T> {
  data: T[];
  message: string;
  page: number;
  pageSize: number;
  totalPages: number;
  success: boolean;
  totalResults: number;
}

interface HttpResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export { type PaginatedResponse, type HttpResponse };
