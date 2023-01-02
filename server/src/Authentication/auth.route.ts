import { Routes } from '@Common/Interfaces/routes.interface';
import validationMiddleware from '@/Middlewares/validation.middleware';
import limiterMiddleware from '@/Middlewares/rateLimiter.middleware';
import { UserLoginDTO } from '@/User/user.dto';
import AuthController from '@Authentication/auth.controller';
import { Router } from 'express';
import { authenticateUser } from '@/Middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // guest endpoints
    this.router.post('/login', limiterMiddleware, validationMiddleware(UserLoginDTO, 'body'), this.authController.logIn);
    this.router.get('/refresh', this.authController.refresh);
    this.router.post('/forget', this.authController.forgetPassword);
    this.router.post('/verify', limiterMiddleware, this.authController.sendVerificationEmail);

    // Protected endpoints
    //this.router.use(authenticateUser);
    this.router.post('/auth/logout', authenticateUser, this.authController.logOut);
    this.router.post('/change-password', authenticateUser, limiterMiddleware, this.authController.changePassword);
  }
}

export default AuthRoute;
