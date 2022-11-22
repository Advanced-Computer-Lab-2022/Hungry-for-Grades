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

    //Verify Email
    this.router.post('/verify', this.traineeController.sendVerificationEmail);

    this.router.get('/:traineeId/cart', this.traineeController.getCart);
    this.router.get('/:traineeId/wishlist', this.traineeController.getWishlist);

    this.router.delete('/:traineeId/cart', this.traineeController.emptyCart);
    this.router.delete('/:traineeId/wishlist', this.traineeController.emptyWishlist);

    this.router.get('/:traineeId/courses', this.traineeController.getTraineeCourses);

    this.router.post('/:traineeId/cart/:courseId', this.traineeController.addCourseToCart);
    this.router.post('/:traineeId/wishlist/:courseId', this.traineeController.addCourseToWishlist);

    this.router.delete('/:traineeId/cart/:courseId', this.traineeController.removeCourseFromCart);
    this.router.delete('/:traineeId/wishlist/:courseId', this.traineeController.removeCourseFromWishlist);

    this.router.post('/:traineeId/enroll/:courseId', this.traineeController.enrollTraineeInCourse);
    this.router.delete('/:traineeId/unroll/:courseId', this.traineeController.unrollTraineeInCourse);
    this.router.get('/:traineeId', this.traineeController.getTraineeById);
    this.router.patch('/:traineeId', this.traineeController.updateTrainee);
    this.router.delete('/:traineeId', this.traineeController.deleteTrainee);
  }
}

export default TraineeRoute;
