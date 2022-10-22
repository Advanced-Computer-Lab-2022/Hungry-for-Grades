
export class PaginatedRequest {
  limit = 12;
  page = 1;
}

 export interface PaginatedResponse<T>  {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  success: boolean;
  message: string;

}


