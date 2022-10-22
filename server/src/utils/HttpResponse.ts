export class HttpResponse<T extends object> {
  success = true;
  message: string;
  data: T;
}
