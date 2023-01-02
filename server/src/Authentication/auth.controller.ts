import { HttpException } from '@/Exceptions/HttpException';
import { verifyRefreshToken } from '@/Token/token.util';
import { UserDTO, UserLoginDTO } from '@/User/user.dto';
import { UserRole } from '@/User/user.enum';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import AuthService from '@Authentication/auth.dao';
import { type IUser } from '@User/user.interface';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { type RequestWithTokenPayload } from './auth.interface';
class AuthController {
  public authService = new AuthService();

  public signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDTO = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData, UserRole.TRAINEE);

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
  public logIn = async (
    req: Request,
    res: Response<
      HttpResponse<{
        firstLogin: boolean;
        role: UserRole;
        token: {
          accessToken: string;
          refreshToken: string;
        };
        user: IUser;
      }>
    >,
    next: NextFunction,
  ) => {
    try {
      const userData: UserLoginDTO = req.body;
      const { cookie, findUser, accessToken, refreshToken, role, firstLogin } = await this.authService.login(userData);

      //res.setHeader('Set-Cookie', [cookie]);
      res.cookie(cookie.name, cookie.value, cookie.options);
      res.status(HttpStatusCodes.OK).json({
        data: { firstLogin, role, token: { accessToken, refreshToken }, user: findUser },
        message: 'login',
        success: true,
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
      const refreshToken = cookies.Authorization ?? cookies.authorization;
      if (!cookies || (!cookies?.Authorization && !cookies.authorization))
        throw new HttpException(HttpStatusCodes.UNAUTHORIZED, "There's No Authorization Cookies");

      const accessToken = verifyRefreshToken(refreshToken);

      res.status(HttpStatusCodes.OK).json({
        data: { accessToken },
        message: 'refreshed access token',
      });
    } catch (error) {
      next(error);
    }
  };

  //forget password controller
  public forgetPassword = async (req: Request, res: Response<HttpResponse<Number>>, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      const { cookie } = await this.authService.sendResetPasswordEmail(email);
      res.cookie(cookie.name, cookie.value, cookie.options);

      res.status(HttpStatusCodes.CREATED).json({ data: null, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // send verification email
  public sendVerificationEmail = async (req: Request, res: Response<HttpResponse<Number>>, next: NextFunction): Promise<void> => {
    try {
      const { email, username,name } = req.body;
      const verificationCode: Number = await this.authService.sendVerificationEmail(email, username,name);
      res.status(HttpStatusCodes.CREATED).json({ data: verificationCode, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // Change Password
  public changePassword = async (req: RequestWithTokenPayload, res: Response<HttpResponse<IUser>>, next: NextFunction): Promise<void> => {
    try {
      const { oldPassword, newPassword } = req.body;
      // old Password only if isReset=false
      const isReset = (req.query.isReset as string) === 'true';

      const { _id, role } = req.tokenPayload;
      const user = await this.authService.changePassword(_id.toString() ?? '', role, oldPassword, newPassword, isReset);
      res.status(HttpStatusCodes.CREATED).json({ data: user, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
