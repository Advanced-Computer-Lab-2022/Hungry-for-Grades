import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { HttpResponse } from '@/utils/HttpResponse';


const errorMiddleware = (error: HttpException, req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ IsSuccessful:false, message,data:null });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
