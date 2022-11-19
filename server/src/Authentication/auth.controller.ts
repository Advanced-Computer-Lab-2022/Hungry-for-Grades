import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import AuthService from '@Authentication/auth.dao';
import { RequestWithUser } from '@Authentication/auth.interface';
import { IUser } from '@User/user.interface';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('signUp');
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData);

      res.status(HttpStatusCodes.CREATED).json({
        data: signUpUserData,
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  };

  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('login');
      const userData: UserLoginDTO = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      //res.setHeader('Set-Cookie', [cookie]);
      res.cookie(cookie.name, cookie.value, cookie.options);
      res.status(HttpStatusCodes.OK).json({
        data: findUser,
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  }

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
}

export default AuthController;
