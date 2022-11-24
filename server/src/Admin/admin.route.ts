import { Routes } from '@/Common/Interfaces/routes.interface';
// import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import AdminController from './admin.controller';

class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminController = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.adminController.createAdmin);
    this.router.post('/instructor', this.adminController.createInstructor);
    this.router.post('/corporateTrainee', this.adminController.createCorporateTrainee);
    this.router.get('/email', this.adminController.getAdminByEmail);
    this.router.get('/username', this.adminController.getAdminByUsername);
  }
}

export default AdminRoute;
