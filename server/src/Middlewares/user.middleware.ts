import { findUserModelByRole } from '@/User/user.util';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { RequestWithTokenPayloadAndUser } from '@Authentication/auth.interface';
import { NextFunction, Response } from 'express';
import { isEmpty } from '@/Utils/util';

// returns req.user the correct user from correct role based in role
async function userMiddleware(request: RequestWithTokenPayloadAndUser, response: Response, next: NextFunction) {
  try {
    if (!request.tokenPayload || isEmpty(request.tokenPayload))
      throw new HttpException(HttpStatusCodes.UNAUTHORIZED, 'No authentication token, please log in');
    const { _id, role } = request.tokenPayload;
    const UserModel = findUserModelByRole(role);
    const user = await UserModel.findById(_id).select('-password').lean().exec();
    if (!user) throw new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Invalid authentication token, please log in');
    request.user = user;
    next();
  } catch (error) {
    next(new HttpException(HttpStatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
}

export default userMiddleware;
