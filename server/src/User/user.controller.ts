import { CreateUserDto } from '@/User/user.dto';
import { IUser } from '@/User/user.interface';
import userService from '@/User/users.dao';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import { NextFunction, Request, Response } from 'express';
import { type filters } from './user.type';
class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request<{}, {}, {}, filters>, res: Response<PaginatedResponse<IUser>>, next: NextFunction) => {
    try {
      const filter: filters = req.query;
      const users: PaginatedData<IUser> = await this.userService.findAllUser(filter);
      res.status(HttpStatusCodes.OK).json({
        ...users,
        message: `found ${users.pageSize} users at page ${users.page}`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await this.userService.findUserById(userId);

      res.json({
        data: findOneUserData,
        message: 'find one user by id',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);

      res.status(201).json({
        data: createUserData,
        message: 'created user successfully with email ',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: IUser = await this.userService.updateUser(userId, userData);

      res.json({
        data: updateUserData,
        message: 'updated user successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await this.userService.deleteUser(userId);

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
