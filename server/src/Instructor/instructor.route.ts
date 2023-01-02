import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import InstructorController from '@Instructor/instructor.controller';
import userMiddleware from '@/Middlewares/user.middleware';
import { allowedRoles, authenticateUser } from '@/Middlewares/auth.middleware';
import { AuthRole } from '@/Authentication/auth.interface';

class InstructorsRoute implements Routes {
  public path = '/instructor';
  public router = Router();
  public instructorController = new InstructorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Protected endpoints
    this.router.get('/', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.instructorController.getAllInstructors);
    this.router.get('/active', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.instructorController.getActiveInstructors);
    this.router.get(
      '/username',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]),
      this.instructorController.getInstructorByUsername,
    );
    this.router.get('/email', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]), this.instructorController.getInstructorByEmail);

    this.router.patch('/:instructorID',
     //authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), 
     this.instructorController.updateInstructorProfile);
    this.router.post('/socialMedia/:instructorID', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.instructorController.addSocialMedia);

    //Ratings & Reviews
    this.router.post(
      '/rating/:instructorID/trainee/:traineeID',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.instructorController.addReviewToInstructor,
    );
    this.router.get(
      '/rating/:instructorID/trainee/:traineeID',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.instructorController.getUserReview,
    );
    this.router.delete(
      '/rating/:instructorID/trainee/:traineeID',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.instructorController.deleteReview,
    );
    this.router.patch(
      '/rating/:instructorID/trainee/:traineeID',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.instructorController.updateUserReview,
    );

    this.router.get('/:instructorID/balance', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.instructorController.getInstructorBalance);

    // Guest
    this.router.get('/top-rated', this.instructorController.getTopRatedInstructors);
    this.router.get('/:instructorID', this.instructorController.getInstructorbyId);
    this.router.get('/rating/:instructorID', this.instructorController.getInstructorReviews);
  }
}

export default InstructorsRoute;
