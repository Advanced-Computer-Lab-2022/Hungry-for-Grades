import { findUserModelByRole } from '@/User/user.util';
import { ACCESS_TOKEN_PRIVATE_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import { RequestWithTokenPayload } from '@Authentication/auth.interface';
import { type ITokenPayload } from '@Token/token.interface';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

// returns in req.tokenPayload = {_id ,role};
async function authMiddleware(req: RequestWithTokenPayload, res: Response, next: NextFunction) {
  try {
    const authHeader: string = req.headers.authorization || (req.headers.Authorization as string);
    logger.info(authHeader);
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      throw new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in');
    }
    const [, acessToken] = authHeader.split(' ');
    verify(acessToken, ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        throw new HttpException(HttpStatusCodes.UNAUTHORIZED, ' Invalid authentication token, please log in');
      }
      const { _id, role } = decoded as ITokenPayload;
      req.tokenPayload = { _id, role };
      next();
    });
  } catch (error) {
    next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
}

export default authMiddleware;
