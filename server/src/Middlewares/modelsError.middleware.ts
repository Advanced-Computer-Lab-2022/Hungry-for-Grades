import { HttpResponse } from '@/Utils/HttpResponsee';
import { logger } from '@/Utils/loggerr';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const modelsErrorMiddleware = (error: Error.ValidationError, req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
  try {
    if (error instanceof Error.ValidationError) {
      error = error as unknown as Error.ValidationError;
      let message: string;
      Object.values(error.errors).forEach(error => (message += `${error.message}, `));
      logger.error(`[${req.method}] ${req.path} >> StatusCode:: 400, Message:: ${message}`);
      res.status(400).json({
        data: null,
        message,
        success: false,
      });
    } else next(error);
  } catch (error) {
    next(error);
  }
};

export default modelsErrorMiddleware;
