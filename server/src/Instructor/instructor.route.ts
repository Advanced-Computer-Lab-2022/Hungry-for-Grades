import { Routes } from '@/Common/Interfaces/routes.interface';
import InstructorController from '@/Instructor/instructor.controller';
import { Role } from '@/User/user.enum';
import roleMiddleware from '@Middlewares/role.middleware';
import { Router } from 'express';
import authMiddleware from '../Middlewares/auth.middleware';
class InstructorsRoute implements Routes {
  public path = '/instructor';
  public router = Router();
  public instructorController = new InstructorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/instructor/profile', authMiddleware, roleMiddleware([Role.INSTRUCTOR]), this.instructorController.getInfo);
    /*  this.router.get('/:id', this.InstructorController.getUserById);
    this.router.post('', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put('/:id', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete('/:id', this.usersController.deleteUser);
 */
  }
}

export default InstructorsRoute;
