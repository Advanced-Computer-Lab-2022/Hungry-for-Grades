// This interface is used to give structure to the response object. This was directly taken from the backend
export interface IHttpException {
  success: boolean;
  statusCode: number;
  error: string;
  code: string;
  message: string;
}
