export class HttpResponse<T extends object> {
  IsSuccessful?: boolean=true;
  message: string;
  data: T;

  
}
