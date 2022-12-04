import InstructorService from '@Instructor/instructor.dao';
import { HttpResponse } from '@Utils/HttpResponse';
import { IInstructor, SocialMedia } from '@Instructor/instructor.interface';
import { NextFunction, Request, Response } from 'express';
import { Rating, Review } from '@/Common/Types/common.types';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import { ReadableStreamBYOBRequest } from 'stream/web';
import { CreateInstructorDTO } from './instructor.dto';

class InstructorController {
  public instructorService = new InstructorService();

  public getInstructorbyId = async (req: Request, res: Response<HttpResponse<IInstructor>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      const instructorData: IInstructor = await this.instructorService.findInstructorById(instructorID);

      res.json({
        data: instructorData,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // add social media controller
  public addSocialMedia = async (req: Request, res: Response<HttpResponse<IInstructor>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      const socialMedia: SocialMedia = req.body as SocialMedia;

      const updatedInstructor: IInstructor = await this.instructorService.addSocialMedia(instructorID, socialMedia);

      res.json({
        data: updatedInstructor,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //add rating controller
  public addReviewToInstructor = async (req: Request, res: Response<HttpResponse<Rating>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      const userReview: Review = req.body;

      const instructorRating: Rating = await this.instructorService.addReviewToInstructor(instructorID, userReview);

      res.json({
        data: instructorRating,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //get all instructor reviews controller
  public getInstructorReviews = async (req: Request, res: Response<PaginatedResponse<Review>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      let page = 1;
      let pageLimit = 5;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const instructorReviewsPaginatedResponse: PaginatedData<Review> = await this.instructorService.getInstructorReviews(
        instructorID,
        page,
        pageLimit,
      );

      res.json({
        ...instructorReviewsPaginatedResponse,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //edit instructor profile controller
  public updateInstructorProfile = async (req: Request, res: Response<HttpResponse<IInstructor>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      const instructorData: CreateInstructorDTO = req.body;

      const updatedInstructor: IInstructor = await this.instructorService.updateInstructor(instructorID, instructorData);

      res.json({
        data: updatedInstructor,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get instructor by email
  public getInstructorByEmail = async (req: Request, res: Response<HttpResponse<IInstructor>>, next: NextFunction) => {
    try {
      const instructorEmail: string = req.query.email as string;
      const instructorData: IInstructor = await this.instructorService.getInstructorByEmail(instructorEmail);

      res.json({
        data: instructorData,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get instructor by username
  public getInstructorByUsername = async (req: Request, res: Response<HttpResponse<IInstructor>>, next: NextFunction) => {
    try {
      const instructorUsername: string = req.query.username as string;
      const instructorData: IInstructor = await this.instructorService.getInstructorByUsername(instructorUsername);

      res.json({
        data: instructorData,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get instructor balance controller
  public getInstructorBalance = async (req: Request, res: Response<HttpResponse<number>>, next: NextFunction) => {
    try {
      const instructorID: string = req.params.instructorID as string;
      const instructorBalance: number = await this.instructorService.getInstructorBalance(instructorID);

      res.json({
        data: instructorBalance,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //top rated instructors controller
  public getTopRatedInstructors = async (req: Request, res: Response<PaginatedResponse<IInstructor>>, next: NextFunction) => {
    try {
      let page = 1;
      let pageLimit = 5;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const topRatedInstructorsPaginatedResponse: PaginatedData<IInstructor> = await this.instructorService.getTopRatedInstructors(page, pageLimit);

      res.json({
        ...topRatedInstructorsPaginatedResponse,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default InstructorController;
