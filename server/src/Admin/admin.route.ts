import { Routes } from '@/Common/Interfaces/routes.interface';
// import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  //   public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get('', this.usersController.getUsers);
    // this.router.get('/:id', this.usersController.getUserById);
    // this.router.post('', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.put('/:id', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete('/:id', this.usersController.deleteUser);
  }
}

export default AdminRoute;
