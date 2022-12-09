import { Routes } from '@/Common/Interfaces/routes.interface';
import { Router } from 'express';
import TraineeController from '@Trainee/trainee.controller';

class TraineeRoute implements Routes {
  public path = '/trainee';
  public router = Router();
  public traineeController = new TraineeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', this.traineeController.createTrainee);
    this.router.get('/email', this.traineeController.getTraineeByEmail);
    this.router.get('/username', this.traineeController.getTraineeByUsername);

    this.router.get('/:traineeId/cart', this.traineeController.getCart);
    this.router.get('/:traineeId/wishlist', this.traineeController.getWishlist);

    this.router.delete('/:traineeId/cart', this.traineeController.emptyCart);
    this.router.delete('/:traineeId/wishlist', this.traineeController.emptyWishlist);

    this.router.post('/:traineeId/cart/:courseId', this.traineeController.addCourseToCart);
    this.router.post('/:traineeId/wishlist/:courseId', this.traineeController.addCourseToWishlist);

    this.router.delete('/:traineeId/cart/:courseId', this.traineeController.removeCourseFromCart);
    this.router.delete('/:traineeId/wishlist/:courseId', this.traineeController.removeCourseFromWishlist);

    //Enrolled Courses
    this.router.get('/:traineeId/courses', this.traineeController.getTraineeCourses);
    this.router.get('/:traineeId/course/:courseId', this.traineeController.getEnrolledCourseById);
    this.router.get('/:traineeId/course/:courseId/viewed-lessons', this.traineeController.getViewedLessons);
    this.router.post('/:traineeId/enroll/:courseId', this.traineeController.enrollTraineeInCourse);
    this.router.delete('/:traineeId/unroll/:courseId', this.traineeController.unrollTraineeInCourse);
    this.router.get('/:traineeId/last-viewed-course', this.traineeController.getLastViewedCourse);
    this.router.get('/:traineeId/course/:courseId/exercise/:exerciseId', this.traineeController.getSubmittedQuestions);
    this.router.post('/:traineeId/course/:courseId/exercise/:exerciseId/question/:questionId', this.traineeController.addSubmittedQuestion);
    this.router.post('/:traineeId/courses/:courseId/exam/submit', this.traineeController.submitExam);

    this.router.get('/:traineeId/balance', this.traineeController.getBalance);

    this.router.get('/:traineeId', this.traineeController.getTraineeById);
    this.router.patch('/:traineeId', this.traineeController.updateTrainee);
    this.router.delete('/:traineeId', this.traineeController.deleteTrainee);
  }
}

export default TraineeRoute;
