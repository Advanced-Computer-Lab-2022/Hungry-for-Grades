import { ICourse } from '@/Course/course.interface';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import TraineeService from '@Trainee/trainee.dao';
import { NextFunction, Request, Response } from 'express';
import { EnrolledCourse, ITrainee } from './trainee.interface';

class TraineeController {
  public traineeService = new TraineeService();

  public getTraineeById = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const trainee: ITrainee = await this.traineeService.getTraineeById(traineeId);
      res.json({ data: trainee, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getTraineeByEmail = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeEmail = req.query.email as string;

      const trainee: ITrainee = await this.traineeService.getTraineeByEmail(traineeEmail);

      res.json({ data: trainee, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getTraineeByUsername = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeUsername = req.query.username as string;

      const trainee: ITrainee = await this.traineeService.getTraineeByUsername(traineeUsername);

      res.json({ data: trainee, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public updateTrainee = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const trainee: ITrainee = await this.traineeService.updateTrainee(traineeId, req.body);
      res.status(HttpStatusCodes.CREATED).json({ data: trainee, message: 'Updated Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //delete trainee
  public deleteTrainee = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const trainee: ITrainee = await this.traineeService.deleteTrainee(traineeId);
      res.json({ data: trainee, message: 'Deleted Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //create trainee controller
  public createTrainee = async (req: Request, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      const traineeData = req.body;
      const trainee: ITrainee = await this.traineeService.addIndividualTrainee(traineeData);
      res.status(HttpStatusCodes.CREATED).json({ data: trainee, message: 'Created Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // enroll trainee in a course controller
  public enrollTraineeInCourse = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const course: ICourse = await this.traineeService.enrollTrainee(traineeId, courseId);
      res.status(HttpStatusCodes.CREATED).json({ data: course, message: 'Enrolled Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //unroll trainee from a course controller
  public unrollTraineeInCourse = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const course: ICourse = await this.traineeService.unrollTrainee(traineeId, courseId);
      res.status(HttpStatusCodes.CREATED).json({ data: course, message: 'Unrolled Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get trainee's enrolled courses controller
  public getTraineeCourses = async (req: Request, res: Response<PaginatedResponse<EnrolledCourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;

      let page = 1;
      let pageLimit = 12;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const paginatedEnrolledCourses: PaginatedData<EnrolledCourse> = await this.traineeService.getTraineeEnrolledCourses(traineeId, page, pageLimit);
      res.status(HttpStatusCodes.CREATED).json({ ...paginatedEnrolledCourses, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}
export default TraineeController;
