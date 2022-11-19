import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import adminService from '@Admin/admin.dao';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/User/user.dto';
import { IUser } from '@/User/user.interface';
import { IInstructor } from '@/Instructor/instructor.interface';
import { CreateInstructorDTO } from '@/Instructor/instructor.dto';
import { CreateTraineeDTO } from '@/Trainee/trainee.dto';
import { ITrainee } from '@/Trainee/trainee.interface';
import { IAdmin } from './admin.interface';
class AdminController {
  public adminService = new adminService();

  public createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: CreateUserDto = req.body;
      const createdAdmin: IAdmin = await this.adminService.createAdmin(adminData);

      res.status(HttpStatusCodes.CREATED).json({
        data: createdAdmin,
        message: 'Admin created successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructorData: CreateInstructorDTO = req.body;
      const createdInstructor: IInstructor = await this.adminService.createInstructor(instructorData);

      res.status(HttpStatusCodes.CREATED).json({
        data: createdInstructor,
        message: 'Instructor created successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createCorporateTrainee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const traineeData: CreateTraineeDTO = req.body;
      const createdTrainee: ITrainee = await this.adminService.createCorporateTrainee(traineeData);

      res.status(HttpStatusCodes.CREATED).json({
        data: createdTrainee,
        message: 'Corporate Trainee created successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
