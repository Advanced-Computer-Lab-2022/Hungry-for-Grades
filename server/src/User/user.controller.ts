import userService from '@/User/users.dao';
import { CreateUserDto } from '@/User/users.dto';
import { User } from '@/User/user.interface';
import { HttpResponse } from '@/utils/HttpResponse';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { NextFunction, Request, Response } from 'express';
import {PaginatedResponse} from '@/utils/Pagination';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response<PaginatedResponse<User>>, next: NextFunction) => {
    try {
      const userData: User[] = await this.userService.findAllUser();
      res.status(HttpStatusCodes.OK).json({
        data: userData,
        message: 'findOne',
        success: true,
        page: 0,
        pageSize: 0,
        totalPages: 0
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
        message: 'findOne',
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
        message: 'created',
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
        message: 'updated',
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
        message: 'deleted',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
