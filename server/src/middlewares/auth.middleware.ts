import { logger } from '@/utils/logger';
import { RequestWithUser, TokenPayload } from '@Authentication/auth.interface';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@User/user.model';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    logger.info('authMiddleware');
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as TokenPayload;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(HttpStatusCodes.NOT_FOUND, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
}

export default authMiddleware;
