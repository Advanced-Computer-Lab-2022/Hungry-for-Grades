import instructorService from '@/Instructor/instructor.dao';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { RequestWithUser } from '@Authentication/auth.interface';
import { IInstructor } from '@Instructor/instructor.interface';
import { IUser } from '@User/user.interface';
import { NextFunction, Response } from 'express';

class InstructorController {
  public instructorService = new instructorService();

  public async getInfo(req: RequestWithUser, res: Response<HttpResponse<IUser & IInstructor>>, next: NextFunction) {
    try {
      const _user = `${req.user._id}` as string;
      const instructor = await this.instructorService.findInstructorByUserId(_user);
      const instructorUser = {
        ...instructor,
        ...req.user,
      };
      res.status(HttpStatusCodes.OK).json({
        data: instructorUser,
        message: `found instructor`,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  /*   public getUserById = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await this.instructorService.findUserById(userId);

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
      const createUserData: IUser = await this.instructorService.createUser(userData);

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
      const updateUserData: IUser = await this.instructorService.updateUser(userId, userData);

      res.json({
        data: updateUserData,
        message: 'updated user successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteInstructor = async (req: Request, res: Response<HttpResponse<IUser>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await this.instructorService.deleteUser(userId);

      res.status(HttpStatusCodes.ACCEPTED).json({
        data: deleteUserData,
        message: 'deleted user successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }; */
}

export default InstructorController;
