import { HttpException } from '@/Exceptions/HttpException';
import { verifyRefreshToken } from '@/Token/token.util';
import { UserDTO, UserLoginDTO } from '@/User/user.dto';
import { Role } from '@/User/user.enum';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import AuthService from '@Authentication/auth.dao';
import { type IUser } from '@User/user.interface';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { type RequestWithTokenPayload } from './auth.interface';
class AuthController {
  public authService = new AuthService();

  public signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('signUp');
      const userData: UserDTO = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData, Role.TRAINEE);

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
      const userData: UserLoginDTO = req.body;
      const { cookie, findUser, accessToken, refreshToken, role } = await this.authService.login(userData);

      //res.setHeader('Set-Cookie', [cookie]);
      res.cookie(cookie.name, cookie.value, cookie.options);
      res.status(HttpStatusCodes.OK).json({
        data: { role, token: { accessToken, expiryToken: cookie.options.maxAge, refreshToken }, user: findUser },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc logout
  // @route POST /auth/logout
  // @access Public - just to clear cookie if exists
  public logOut = async (request: RequestWithTokenPayload, response: Response, next: NextFunction) => {
    try {
      const { cookies } = request;
      if (!cookies || !cookies.Authorization) {
        return response.status(HttpStatusCodes.NO_CONTENT);
      }

      const logOutUserData: IUser = await this.authService.logout(request.tokenPayload);
      response.clearCookie('Authorization', {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      });

      response.status(HttpStatusCodes.OK).json({
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
      const { cookies } = req;
      if (!cookies || !cookies?.Authorization) throw new HttpException(HttpStatusCodes.UNAUTHORIZED, "There's No Authorization Cookies");

      const refreshToken = cookies.Authorization ?? cookies.authorization;
      const accessToken = verifyRefreshToken(refreshToken);

      res.status(HttpStatusCodes.OK).json({
        data: { accessToken },
        message: 'refreshed refresh token',
      });
    } catch (error) {
      next(error);
    }
  };

  //forget password controller
  public forgetPassword = async (req: Request, res: Response<HttpResponse<Number>>, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.sendResetPasswordEmail(email);
      res.status(HttpStatusCodes.CREATED).json({ data: null, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // send verification email
  public sendVerificationEmail = async (req: Request, res: Response<HttpResponse<Number>>, next: NextFunction): Promise<void> => {
    try {
      const { email, username } = req.body;
      const verificationCode: Number = await this.authService.sendVerificationEmail(email, username);
      res.status(HttpStatusCodes.CREATED).json({ data: verificationCode, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // Change Password
  public changePassword = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction): Promise<void> => {
    try {
      const { _id, role, oldPassword, newPassword } = req.body;
      const user = await this.authService.changePassword(_id, role, oldPassword, newPassword);
      res.status(HttpStatusCodes.CREATED).json({ data: user, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
