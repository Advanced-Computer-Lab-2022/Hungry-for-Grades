import CourseController from '@Course/course.controller';
import { Routes } from '@/common/Interfaces/routes.interface';
import { Router } from 'express';

class CoursesRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', this.courseController.getAllCourses);
    this.router.post('/', this.courseController.createCourse);
    this.router.get('/:id', this.courseController.getCourseById);
    this.router.put('/:id', this.courseController.updateCourse);
    this.router.delete('/:id', this.courseController.deleteCourse);
  }
}

export default CoursesRoute;
