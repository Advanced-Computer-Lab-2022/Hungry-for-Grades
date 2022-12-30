import { Routes } from '@/Common/Interfaces/routes.interface';
import { Router } from 'express';
import TraineeController from '@Trainee/trainee.controller';
import { UserRole } from '@/User/user.enum';
import userMiddleware from '@/Middlewares/user.middleware';
import fileUpload from 'express-fileupload';
import { allowedRoles, authenticateUser } from '@/Middlewares/auth.middleware';
import { AuthRole } from '@/Authentication/auth.interface';

class TraineeRoute implements Routes {
  public path = '/trainee';
  public router = Router();
  public traineeController = new TraineeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //this.router.get('/', this.traineeController.getAllTrainees);
    this.router.post('/signup', this.traineeController.createTrainee);
    //this.router.get('/info', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), userMiddleware, this.traineeController.getTraineeInfo);

    // this.router.use(authenticateUser);
    this.router.get(
      '/email',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.ADMIN]),
      this.traineeController.getTraineeByEmail,
    );
    this.router.get(
      '/username',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.ADMIN]),
      this.traineeController.getTraineeByUsername,
    );

    //notes
    this.router.post(
      '/:traineeId/notes',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.updateNotes,
    );

    // Cart & Wishlist
    this.router.get('/:traineeId/cart', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.traineeController.getCart);
    this.router.get('/:traineeId/wishlist', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.traineeController.getWishlist);

    this.router.delete('/:traineeId/cart', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.traineeController.emptyCart);
    this.router.delete('/:traineeId/wishlist', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.traineeController.emptyWishlist);

    this.router.post(
      '/:traineeId/cart/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]),
      this.traineeController.addCourseToCart,
    );
    this.router.post(
      '/:traineeId/wishlist/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]),
      this.traineeController.addCourseToWishlist,
    );

    this.router.delete(
      '/:traineeId/cart/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]),
      this.traineeController.removeCourseFromCart,
    );
    this.router.delete(
      '/:traineeId/wishlist/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]),
      this.traineeController.removeCourseFromWishlist,
    );

    // Certificate
    this.router.post(
      '/:traineeId/course/:courseId/certificate',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.ADMIN]),
      fileUpload(),
      this.traineeController.sendCertificate,
    );

    // Exam Answers
    this.router.get(
      '/:traineeId/course/:courseId/exam-answers',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getSubmittedExamAnswers,
    );

    //Enrolled Courses
    this.router.get(
      '/:traineeId/courses',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getTraineeCourses,
    );
    this.router.get(
      '/:traineeId/course/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getEnrolledCourseById,
    );
    this.router.get(
      '/:traineeId/course/:courseId/viewed-lessons',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getViewedLessons,
    );

    this.router.post('/:traineeId/enroll/:courseId', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.traineeController.enrollTraineeInCourse);
    this.router.delete(
      '/:traineeId/unroll/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.ADMIN]),
      this.traineeController.unrollTraineeInCourse,
    );

    this.router.get(
      '/:traineeId/courses/certified',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getCertifiedCourses,
    );
    this.router.get(
      '/:traineeId/last-viewed-course',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getLastViewedCourse,
    );
    this.router.get(
      '/:traineeId/course/:courseId/exercise/:exerciseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getSubmittedQuestions,
    );
    this.router.post(
      '/:traineeId/course/:courseId/exercise/:exerciseId/question/:questionId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.addSubmittedQuestion,
    );
    this.router.post(
      '/:traineeId/courses/:courseId/exam/submit',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.submitExam,
    );

    this.router.get(
      '/:traineeId/balance',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.getBalance,
    );

    // CRUD Trainee
    this.router.get(
      '/:traineeId',
      authenticateUser,
      this.traineeController.getTraineeById,
    );
    this.router.patch(
      '/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.traineeController.updateTrainee,
    );
    this.router.delete(
      '/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.ADMIN]),
      this.traineeController.deleteTrainee,
    );
  }
}

export default TraineeRoute;
