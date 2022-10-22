export class HttpResponse<T extends object> {
  success: boolean;
  message: string;
  data: T;
}
