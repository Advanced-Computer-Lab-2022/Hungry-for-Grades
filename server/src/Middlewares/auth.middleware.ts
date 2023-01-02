import { findUserModelByRole } from '@/User/user.util';
import { ACCESS_TOKEN_PRIVATE_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import { AuthRole, RequestWithTokenPayload } from '@Authentication/auth.interface';
import { type ITokenPayload } from '@Token/token.interface';
import { NextFunction, RequestHandler, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRole } from '@/User/user.enum';
import { isEmpty } from 'class-validator';
import { Console } from 'console';

// returns in req.tokenPayload = {_id ,role};
async function authenticateUser(req: RequestWithTokenPayload, res: Response, next: NextFunction) {
  try {
    console.log(req.headers.authorization);
    const authHeader: string = req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      throw new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in');
    }
    const [, accessToken] = authHeader.split(' ');
    verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        throw new HttpException(HttpStatusCodes.UNAUTHORIZED, ' Invalid authentication token, please log in');
      }
      const { _id, role } = decoded as ITokenPayload;
      req.tokenPayload = { _id, role };
      next();
    });
  } catch (error) {
    next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token, please log in'));
  }
}

const allowedRoles = (acceptedRoles: AuthRole[]): RequestHandler => {
  return (req: RequestWithTokenPayload, response, next) => {
    console.log(req.tokenPayload);
    if (!req.tokenPayload || isEmpty(req.tokenPayload)) {
      next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in'));
    }

    // check user id in param matches id saved in token
    const { _id, role } = req.tokenPayload;
    console.log(role);
    if (role != AuthRole.ADMIN) {
      console.log(req.params.traineeId);
      const userId =
        req.params.traineeId ??
        req.params.traineeID ??
        req.params.userId ??
        req.params.userID ??
        req.params.instructorId ??
        req.params.instructorID ??
        null;
      console.log(userId);
      if (userId && userId != _id.toString())
        throw new HttpException(HttpStatusCodes.FORBIDDEN, `You are not authorized to access this resource as a ${role}`);
    }

    if (!acceptedRoles.includes(role)) {
      next(new HttpException(HttpStatusCodes.FORBIDDEN, `You are not authorized to access this resource as a ${role}`));
    } else {
      next();
    }
  };
};

export { authenticateUser, allowedRoles };
