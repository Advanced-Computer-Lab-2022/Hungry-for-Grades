import { Routes } from '@Common/Interfaces/routes.interface';
import authMiddleware from '@/Middlewares/auth.middleware';
import validationMiddleware from '@/Middlewares/validation.middleware';
import limiterMiddleware from '@/Middlewares/rateLimiter.middleware';
import { UserLoginDTO } from '@/User/user.dto';
import AuthController from '@Authentication/auth.controller';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', limiterMiddleware, validationMiddleware(UserLoginDTO, 'body'), this.authController.logIn);
    this.router.post('/auth/logout', authMiddleware, this.authController.logOut);
    this.router.get('/refresh', this.authController.refresh);
    this.router.post('/forget', this.authController.forgetPassword);
    //Verify Email
    this.router.post('/verify', limiterMiddleware, this.authController.sendVerificationEmail);
  }
}

export default AuthRoute;
