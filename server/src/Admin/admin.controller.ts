import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import adminService from '@Admin/admin.dao';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/User/user.dto';
import { IInstructor } from '@/Instructor/instructor.interface';
import { CreateInstructorDTO } from '@/Instructor/instructor.dto';
import { CreateTraineeDTO } from '@/Trainee/trainee.dto';
import { ITrainee } from '@/Trainee/trainee.interface';
import { IAdmin } from './admin.interface';
import { RequestWithTokenPayloadAndUser } from '@/Authentication/auth.interface';
import { HttpResponse } from '@/Utils/HttpResponse';
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
  // @desc gets Admin info by accessToken
  public getAdminInfo = async (req: RequestWithTokenPayloadAndUser, res: Response<HttpResponse<IAdmin>>, next: NextFunction): Promise<void> => {
    try {
      res.json({ data: req.user as IAdmin, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
  // @desc gets all Admins info
  public getAllAdmins = async (req: Request, res: Response<HttpResponse<IAdmin[]>>, next: NextFunction): Promise<void> => {
    try {
      const adminsData: IAdmin[] = await this.adminService.findAdmins();
      res.json({ data: adminsData, message: 'Completed Successfully', success: true });
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

  // get admin by email
  public getAdminByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminEmail: string = req.query.email as string;
      const admin: IAdmin = await this.adminService.getAdminByEmail(adminEmail);

      res.status(HttpStatusCodes.OK).json({
        data: admin,
        message: 'Admin retrieved successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get admin by username
  public getAdminByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminUsername: string = req.query.username as string;
      const admin: IAdmin = await this.adminService.getAdminByUsername(adminUsername);

      res.status(HttpStatusCodes.OK).json({
        data: admin,
        message: 'Admin retrieved successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
