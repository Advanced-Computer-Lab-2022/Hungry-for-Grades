import { Routes } from '@Common/Interfaces/routes.interface';
import validationMiddleware from '@/Middlewares/validation.middleware';
import UsersController from '@/User/user.controller';
import { CreateUserDto } from '@/User/user.dto';
import { Router } from 'express';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', this.usersController.getUsers);
    this.router.get('/:id', this.usersController.getUserById);
    this.router.post('', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put('/:id', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete('/:id', this.usersController.deleteUser);
  }
}

export default UsersRoute;
