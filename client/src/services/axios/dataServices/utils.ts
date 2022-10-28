export type PaginatedData<T> = {
  data: T[];
  message: string;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  success: boolean;
} & PaginatedData<T>;

export type PaginatedRequest = {
  limit: number;
  page: number;
};

export type HttpResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
