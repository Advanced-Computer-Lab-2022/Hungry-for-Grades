import { HttpResponse } from './HttpResponse';

export class PaginatedRequest {
  limit = 12;
  page = 1;
}

export class PaginatedResponse<T> extends HttpResponse<object> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
}
