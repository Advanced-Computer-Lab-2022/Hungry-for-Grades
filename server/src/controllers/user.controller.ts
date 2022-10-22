import userService from '@/DAO/users.dao';
import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import { HttpResponse } from '@/utils/HttpResponse';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

class UsersController {
  private userService = new userService();

  public getUsers = async (req: Request, res: Response<HttpResponse<User[]>>, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.json({
        data: findAllUsersData,
        message: 'findAll',
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
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request<{ id: Types.ObjectId }>, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.json({
        data: updateUserData,
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request<{ id: Types.ObjectId }>, res: Response<HttpResponse<User>>, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.json({
        data: deleteUserData,
        message: 'deleted',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
