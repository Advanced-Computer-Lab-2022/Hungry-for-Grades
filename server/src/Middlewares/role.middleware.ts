import { HttpException } from '@/Exceptions/HttpException';
import { logger } from '@/Utils/logger';
import { RequestWithTokenPayload } from '@Authentication/auth.interface';
import { Role } from '@User/user.enum';
import { RequestHandler } from 'express';
import { isEmpty } from '@/Utils/util';

import HttpStatusCodes from '@/Utils/HttpStatusCodes';

// based on role type allowed
const roleMiddleware = (acceptedRoles: Role[]): RequestHandler => {
  return (request: RequestWithTokenPayload, response, next) => {
    if (!request.tokenPayload || isEmpty(request.tokenPayload)) {
      logger.error('No authentication token, please log in');
      next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in'));
    }
    const { role } = request.tokenPayload;
    if (!acceptedRoles.includes(role)) {
      next(new HttpException(HttpStatusCodes.UNAUTHORIZED, `You are not Authorized as ${role}`));
    } else {
      next();
    }
  };
};

export default roleMiddleware;
