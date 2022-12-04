import { Routes } from '@Common/Interfaces/routes.interface';
import UserController from '@/User/user.controller';
import { Router } from 'express';
import authMiddleware from '@/Middlewares/auth.middleware';
import userMiddleware from '@/Middlewares/user.middleware';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/info', authMiddleware, userMiddleware, this.userController.getUserInfo);
    //  this.router.get('', this.userController.getUsers);
    /*  this.router.get('/:id', this.usersController.getUserById);
     this.router.post('', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
     this.router.put('/:id', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
     this.router.delete('/:id', this.usersController.deleteUser); */
  }
}

export default UserRoute;
