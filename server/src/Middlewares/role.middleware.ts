import { HttpException } from '@/Exceptions/HttpException';
import { logger } from '@/Utils/logger';
import { RequestWithUser } from '@Authentication/auth.interface';
import { Role } from '@User/user.enum';
import { RequestHandler } from 'express';

import HttpStatusCodes from '@/Utils/HttpStatusCodes';

const roleMiddleware = (acceptedRoles: Role[]): RequestHandler => {
  return (req: RequestWithUser, res, next) => {
    logger.info('roleMiddleware');
    const { role } = req.user;
    if (acceptedRoles.includes(role)) {
      next(new HttpException(HttpStatusCodes.UNAUTHORIZED, `You are not Authorized as ${role}`));
    } else {
      next();
    }
  };
};

export default roleMiddleware;
