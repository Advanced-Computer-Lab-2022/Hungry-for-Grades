import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import InstructorController from '@Instructor/instructor.controller';
import authMiddleware from '@/Middlewares/auth.middleware';
import roleMiddleware from '@/Middlewares/role.middleware';
import { Role } from '@/User/user.enum';
import userMiddleware from '@/Middlewares/user.middleware';

class InstructorsRoute implements Routes {
  public path = '/instructor';
  public router = Router();
  public instructorController = new InstructorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // @desc get all instructors
    this.router.get('/', this.instructorController.getAllInstructors);
    this.router.get('/username', this.instructorController.getInstructorByUsername);
    this.router.get('/email', this.instructorController.getInstructorByEmail);
    // @desc get instructor info by accesstoken
    this.router.get('/info', authMiddleware, roleMiddleware([Role.INSTRUCTOR]), userMiddleware, this.instructorController.getInstructorInfo);
    this.router.get('/top-rated', this.instructorController.getTopRatedInstructors);

    this.router.get('/:instructorID', this.instructorController.getInstructorbyId);
    this.router.patch('/:instructorID', this.instructorController.updateInstructorProfile);

    this.router.post('/socialMedia/:instructorID', this.instructorController.addSocialMedia);
    this.router.post('/rating/:instructorID', this.instructorController.addReviewToInstructor);
    this.router.get('/rating/:instructorID', this.instructorController.getInstructorReviews);

    this.router.get('/:instructorID/balance', this.instructorController.getInstructorBalance);
  }
}

export default InstructorsRoute;
