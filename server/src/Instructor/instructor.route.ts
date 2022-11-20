import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import InstructorController from '@Instructor/instructor.controller';
import InstructorService from './instructor.dao';

class InstructorsRoute implements Routes {
  public path = '/instructor';
  public router = Router();
  public instructorController = new InstructorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:instructorID', this.instructorController.getInstructorbyId);
    this.router.post('/socialMedia/:instructorID', this.instructorController.addSocialMedia);
    this.router.post('/rating/:instructorID', this.instructorController.addReview);
    this.router.get('/rating/:instructorID', this.instructorController.getInstructorReviews);
  }
}

export default InstructorsRoute;
