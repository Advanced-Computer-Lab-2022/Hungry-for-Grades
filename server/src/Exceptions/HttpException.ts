import HttpStatusCodes from '@/Utils/HttpStatusCodes';
export class HttpException extends Error {
  public status: HttpStatusCodes;
  public message: string;

  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
