import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import AuthService from '@Authentication/auth.dao';
import { RequestWithUser } from '@Authentication/auth.interface';
import { IUser } from '@User/user.interface';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
class AuthController {
  public authService = new AuthService();

  public signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('signUp');
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData, userData.role);

      res.status(HttpStatusCodes.CREATED).json({
        data: signUpUserData,
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  });

  // @desc login
  // @route POST /login
  // @access Public
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('login');
      const userData: UserLoginDTO = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      logger.info('after authService');

      //res.setHeader('Set-Cookie', [cookie]);
      res.cookie(cookie.name, cookie.value, cookie.options);
      res.status(HttpStatusCodes.OK).json({
        data: findUser,
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc logout
  // @route POST /auth/logout
  // @access Public - just to clear cookie if exists
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.user;
      const logOutUserData: IUser = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(HttpStatusCodes.OK).json({
        data: logOutUserData,
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc Refresh
  // @route GET /auth/refresh
  // @access Public - because acess token has expired
  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.cookies;
      let refreshUserData: IUser;
      /* = await this.authService.refresh(authorization);
       */
      res.status(HttpStatusCodes.OK).json({
        data: refreshUserData,
        message: 'refresh',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
