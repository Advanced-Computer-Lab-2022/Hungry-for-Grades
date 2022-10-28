import { PaginatedResponse } from '@/utils/PaginationResponse';
import courseService from '@Course/course.dao';
import { Course } from '@Course/course.interface';
import { HttpResponse } from '@utils/HttpResponse';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { NextFunction, Request, Response } from 'express';
import { Category, CourseFilters, CourseFiltersDefault } from '@Course/course.types';
import { Rating, Review } from '@/Common/Types/common.types';

class CourseController {
  public courseService = new courseService();

  public getAllCourses = async (req: Request<{}, {}, {}, CourseFilters>, res: Response<PaginatedResponse<Course>>, next: NextFunction) => {
    try {
      const requestFilters: CourseFilters = req.query;

      // FIlter out empty params
      for (const param in requestFilters) {
        if (requestFilters[param] === null || requestFilters[param] === '') {
          delete requestFilters[param];
        }
      }

      // Supply default values to query params (if not supplied)
      const filters = { ...CourseFiltersDefault, ...requestFilters };

      // Parse Numbers sent in query
      for (const key in filters) {
        if (!isNaN(parseInt(filters[key as string]))) filters[key as string] = parseInt(filters[key as string]);
      }

      const coursesPaginatedResponse: PaginatedResponse<Course> = await this.courseService.getAllCourses(filters);

      res.json(coursesPaginatedResponse);
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response<HttpResponse<Course>>, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const country: string = req.query.country as string;
      const courseData: Course = await this.courseService.getCourseById(courseId, country);

      res.json({
        data: courseData,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createCourse = async (req: Request, res: Response<HttpResponse<Course>>, next: NextFunction) => {
    try {
      const courseData: Course = req.body;
      const createdCourse: Course = await this.courseService.createCourse(courseData);

      res.status(201).json({
        data: createdCourse,
        message: 'Course Created Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (req: Request, res: Response<HttpResponse<Course>>, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const courseData: Course = req.body;
      const updatedCourse: Course = await this.courseService.updateCourse(courseId, courseData);

      res.json({
        data: updatedCourse,
        message: 'Course Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteCourse = async (req: Request, res: Response<HttpResponse<Course>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: Course = await this.courseService.deleteCourse(userId);

      res.status(HttpStatusCodes.ACCEPTED).json({
        data: deleteUserData,
        message: 'Course Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllCategories = async (req: Request, res: Response<HttpResponse<Category[]>>, next: NextFunction) => {
    try {
      const categoryList = await this.courseService.getAllCategories();
      res.json({
        data: categoryList,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public addRating = async (req: Request, res: Response<HttpResponse<Rating>>, next: NextFunction) => {
    try {
      const userReview: Review = req.body;
      const courseId: string = req.params.id;

      const courseRating = await this.courseService.addRating(courseId, userReview);
      res.status(201).json({
        data: courseRating,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default CourseController;
