import { CreateUserDto } from '@/User/user.dto';
import { User } from '@/User/user.interface';
import userService from '@/User/users.dao';
import { HttpResponse } from '@/utils/HttpResponse';
import { PaginatedData, PaginatedResponse } from '@/utils/PaginationResponse';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { NextFunction, Request, Response } from 'express';
import { type filters } from './user.type';
class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request<{}, {}, {}, filters>, res: Response<PaginatedResponse<User>>, next: NextFunction) => {
    try {
      const filter: filters = req.query;
      const users: PaginatedData<User> = await this.userService.findAllUser(filter);
      res.status(HttpStatusCodes.OK).json({
        ...users,
        message: `found ${users.pageSize} users at page ${users.page}`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.json({
        data: findOneUserData,
        message: 'find one user by id',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({
        data: createUserData,
        message: 'created user successfully with email ',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.json({
        data: updateUserData,
        message: 'updated user successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(HttpStatusCodes.ACCEPTED).json({
        data: deleteUserData,
        message: 'deleted user successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
