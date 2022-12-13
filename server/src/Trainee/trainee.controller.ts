import { RequestWithTokenPayload, RequestWithTokenPayloadAndUser } from '@/Authentication/auth.interface';
import { ICourse } from '@/Course/course.interface';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import TraineeService from '@Trainee/trainee.dao';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { CartDTO, WishlistDTO } from './trainee.dto';
import { EnrolledCourse, INote, ITrainee, SubmittedQuestion } from './trainee.interface';

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
  // @desc gets Trainee info by accessToken
  public getTraineeInfo = async (req: RequestWithTokenPayloadAndUser, res: Response<HttpResponse<ITrainee>>, next: NextFunction): Promise<void> => {
    try {
      res.json({ data: req.user as ITrainee, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // @desc gets all Trainees info
  public getAllTrainees = async (req: Response, res: Response<HttpResponse<ITrainee[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineesData: ITrainee[] = await this.traineeService.getTrainees();
      res.json({ data: traineesData, message: 'Completed Successfully', success: true });
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
      res.json({ data: trainee, message: 'Updated Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
  public updateNotes = async (req: RequestWithTokenPayload, res: Response<HttpResponse<null>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = `${req.tokenPayload._id}`;
      logger.info(traineeId);

      const { notes } = req.body as { notes: INote[] };

      await this.traineeService.updateNotes(traineeId, notes);
      res.json({ data: null, message: 'Updated Successfully', success: true });
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
      res.json({ data: course, message: 'Enrolled Successfully', success: true });
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
      res.json({ data: course, message: 'Unrolled Successfully', success: true });
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
      res.json({ ...paginatedEnrolledCourses, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // add to cart controller
  public addCourseToCart = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const courses: ICourse[] = await this.traineeService.addToCart(traineeId, courseId);
      res.json({ data: courses, message: 'Added to cart Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public addCourseToWishlist = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const courses: ICourse[] = await this.traineeService.addToWishlist(traineeId, courseId);
      res.json({ data: courses, message: 'Added to cart Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // remove from cart controller
  public removeCourseFromCart = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const country = (req.query.country as string) ?? 'US';

      const course: ICourse[] = await this.traineeService.removeFromCart(traineeId, courseId, country);
      res.json({ data: course, message: 'Removed from cart Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public removeCourseFromWishlist = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const country = (req.query.country as string) ?? 'US';

      const courses: ICourse[] = await this.traineeService.removeFromWishlist(traineeId, courseId, country);
      res.json({ data: courses, message: 'Removed from cart Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get cart controller
  public getCart = async (req: Request, res: Response<PaginatedResponse<ICourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const country = (req.query.country as string) ?? 'US';

      let page = 1;
      let pageLimit = 8;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const coursesPaginatedResponse: CartDTO = await this.traineeService.getCart(traineeId, country, page, pageLimit);
      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getWishlist = async (req: Request, res: Response<PaginatedResponse<ICourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const country = (req.query.country as string) ?? 'US';

      let page = 1;
      let pageLimit = 8;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const coursesPaginatedResponse: WishlistDTO = await this.traineeService.getWishlist(traineeId, country, page, pageLimit);
      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //empty cart controller
  public emptyCart = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courses: ICourse[] = await this.traineeService.emptyCart(traineeId);
      res.json({ data: courses, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //empty wishlist
  public emptyWishlist = async (req: Request, res: Response<HttpResponse<ICourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courses: ICourse[] = await this.traineeService.emptyWishlist(traineeId);
      res.json({ data: courses, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get enrolled course controller
  public getEnrolledCourseById = async (req: Request, res: Response<HttpResponse<EnrolledCourse>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;

      const enrolledCourse: EnrolledCourse = await this.traineeService.getEnrolledCourseById(traineeId, courseId);
      res.json({ data: enrolledCourse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get last viewed course controller
  public getLastViewedCourse = async (
    req: RequestWithTokenPayload,
    res: Response<HttpResponse<EnrolledCourse>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const traineeId = `${req.tokenPayload._id}`;
      logger.info(traineeId);

      const lastViewedCourse = await this.traineeService.getLastViewedCourse(traineeId);
      res.json({ data: lastViewedCourse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get trainee balance controller
  public getBalance = async (req: Request, res: Response<HttpResponse<Number>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;

      const balance = await this.traineeService.getTraineeBalance(traineeId);
      res.json({ data: balance, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get trainees submitted questions controller
  public getSubmittedQuestions = async (req: Request, res: Response<HttpResponse<SubmittedQuestion[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const exerciseId = req.params.exerciseId as string;

      const submittedQuestions = await this.traineeService.getTraineeSubmittedQuestionsInCourse(traineeId, courseId, exerciseId);
      res.json({ data: submittedQuestions, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // add trainee submitted question controller
  public addSubmittedQuestion = async (req: Request, res: Response<HttpResponse<SubmittedQuestion>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;
      const exerciseId = req.params.exerciseId as string;
      const questionId = req.params.questionId as string;

      const { answer } = req.body;

      await this.traineeService.addorUpdateTraineeSubmittedQuestion(traineeId, courseId, exerciseId, questionId, answer);

      res.json({ data: null, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //submit exam controller
  public submitExam = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;

      const examAnswers: string[] = req.body;

      await this.traineeService.submitExam(traineeId, courseId, examAnswers);
      res.json({ data: null, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get trainee's viewed lessons controller
  public getViewedLessons = async (req: Request, res: Response<HttpResponse<Types.ObjectId[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;
      const courseId = req.params.courseId as string;

      const viewedLessons = await this.traineeService.getTraineeViewedLessons(traineeId, courseId);
      res.json({ data: viewedLessons, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get trainee's certified courses
  public getCertifiedCourses = async (req: Request, res: Response<HttpResponse<EnrolledCourse[]>>, next: NextFunction): Promise<void> => {
    try {
      const traineeId = req.params.traineeId as string;

      const certifiedCourses = await this.traineeService.getTraineeCertifiedCourses(traineeId);
      res.json({ data: certifiedCourses, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}
export default TraineeController;
