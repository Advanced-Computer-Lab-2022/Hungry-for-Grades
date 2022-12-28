import { Routes } from '@/Common/Interfaces/routes.interface';
import { authenticateUser, allowedRoles } from '@/Middlewares/auth.middleware';
import { Router } from 'express';
import AdminController from './admin.controller';
import express from 'express';
import { AuthRole } from '@/Authentication/auth.interface';
const app = express();

class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminController = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //  this.router.use(authenticateUser);
    //  this.router.use(allowedRoles([AuthRole.ADMIN]));

    this.router.get('/', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.getAllAdmins);
    this.router.post('/', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.createAdmin);
    this.router.post('/instructor', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.createInstructor);
    this.router.post('/corporateTrainee', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.createCorporateTrainee);
    this.router.get('/email', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.getAdminByEmail);
    this.router.get('/username', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.adminController.getAdminByUsername);
  }
}

export default AdminRoute;
