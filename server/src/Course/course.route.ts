import CourseController from '@Course/course.controller';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import { CourseDTO } from './course.dto';
import validationMiddleware from '@/Middlewares/validation.middleware';

class CoursesRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', this.courseController.getAllCourses);
    this.router.post('/', validationMiddleware(CourseDTO, 'body'), this.courseController.createCourse);
    this.router.get('/category', this.courseController.getAllCategories);
    this.router.get('/price/max', this.courseController.getMaxCoursePrice);
    //this.router.post('/rating/:id', this.courseController.addRating);
    this.router.get('/instructor/:instructorId', this.courseController.getInstructorCourses);
    this.router.get('/:id', this.courseController.getCourseById);
    this.router.put('/:id', this.courseController.updateCourse);
    this.router.delete('/:id', this.courseController.deleteCourse);
  }
}

export default CoursesRoute;
