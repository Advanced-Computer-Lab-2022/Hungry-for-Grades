import { Rating, Review } from '@/Common/Types/common.types';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import courseService from '@Course/course.dao';
import { Course } from '@Course/course.interface';
import { Category, CourseFilters, CourseFiltersDefault } from '@Course/course.types';
import { NextFunction, Request, Response } from 'express';
import { addDefaultValuesToCourseFilters } from '@Course/course.common';
import { ITeachedCourse } from '@/Instructor/instructor.interface';
import { CategoryDTO, CourseDTO } from './course.dto';

class CourseController {
  public courseService = new courseService();

  public getAllCourses = async (req: Request<{}, {}, {}, CourseFilters>, res: Response<PaginatedResponse<Course>>, next: NextFunction) => {
    try {
      const requestFilters: CourseFilters = req.query;
      const newFilters = await addDefaultValuesToCourseFilters(requestFilters);

      const coursesPaginatedResponse: PaginatedData<Course> = await this.courseService.getAllCourses(newFilters);

      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get max course price
  public getMaxCoursePrice = async (req: Request, res: Response<HttpResponse<number>>, next: NextFunction) => {
    try {
      const maxPrice = await this.courseService.getMaxPrice((req.query.country as string) ?? 'US');
      res.json({ data: maxPrice, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getInstructorCourses = async (
    req: Request<{ instructorId: string }, {}, {}, CourseFilters>,
    res: Response<PaginatedResponse<ITeachedCourse>>,
    next: NextFunction,
  ) => {
    try {
      const requestFilters: CourseFilters = req.query;
      const newFilters = await addDefaultValuesToCourseFilters(requestFilters);

      const coursesPaginatedResponse: PaginatedData<ITeachedCourse> = await this.courseService.getCoursesTaughtByInstructor(
        req.params.instructorId,
        newFilters,
      );

      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
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
      const courseData: CourseDTO = req.body;
      const country = (req.query.country as string) ?? 'US';
      const createdCourse: Course = await this.courseService.createCourse(courseData, country);

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

  public getAllCategories = async (req: Request, res: Response<HttpResponse<CategoryDTO[]>>, next: NextFunction) => {
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

  //   public addRating = async (req: Request, res: Response<HttpResponse<Rating>>, next: NextFunction) => {
  //     try {
  //       const userReview: Review = req.body;
  //       const courseId: string = req.params.id;

  //       const courseRating = await this.courseService.addRating(courseId, userReview);
  //       res.status(201).json({
  //         data: courseRating,
  //         message: 'Completed Successfully',
  //         success: true,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
  // }
}
export default CourseController;
