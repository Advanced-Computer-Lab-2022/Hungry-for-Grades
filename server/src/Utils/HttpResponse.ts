export interface HttpResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
