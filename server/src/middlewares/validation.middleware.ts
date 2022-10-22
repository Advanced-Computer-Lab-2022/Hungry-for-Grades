import HttpStatusCodes from '@/utils/HttpStatusCodes';
import { HttpException } from '@exceptions/HttpException';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req.get(value)), {
      forbidNonWhitelisted,
      skipMissingProperties,
      whitelist,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(HttpStatusCodes.BAD_REQUEST, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
