import { Routes } from '@/common/Interfaces/routes.interface';
import authMiddleware from '@/Middlewares/auth.middleware';
import validationMiddleware from '@/Middlewares/validation.middleware';
import { CreateUserDto, FindUserDto } from '@/User/user.dto';
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
    this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post('/login', validationMiddleware(FindUserDto, 'body'), this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
