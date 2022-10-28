import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import InstructorController from '@Instructor/instructor.controller';

class InstructorsRoute implements Routes {
  public path = '/instructor';
  public router = Router();
  public instructorController = new InstructorController();

  constructor() {
    //this.initializeRoutes();
  }

  //private initializeRoutes() {}
}

export default InstructorsRoute;
