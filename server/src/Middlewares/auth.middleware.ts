import adminModel from '@/Admin/admin.model';
import { SECRET_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import instructorModel from '@/Instructor/instructor.model';
import traineeModel from '@/Trainee/trainee.model';
import { IUser } from '@/User/user.interface';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import { RequestWithUser, TokenPayload } from '@Authentication/auth.interface';
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

      let userModel;
      const findTrainee: IUser = await traineeModel.findById(userId);
      if (findTrainee) userModel = traineeModel;

      const findInstructor: IUser = await instructorModel.findById(userId);
      if (findInstructor) userModel = instructorModel;

      const findAdmin: IUser = await adminModel.findById(userId);
      if (findAdmin) userModel = adminModel;

      const findUser = findTrainee ?? findInstructor ?? findAdmin;
      if (findUser) {
        delete findUser.password;
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
