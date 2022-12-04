import { IAdmin } from '@/Admin/admin.interface';
import { Routes } from '@/Common/Interfaces/routes.interface';
import authMiddleware from '@/Middlewares/auth.middleware';
import roleMiddleware from '@/Middlewares/role.middleware';
import userMiddleware from '@/Middlewares/user.middleware';
import { Role } from '@/User/user.enum';
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
    // @desc get all admins
    this.router.get('/', this.adminController.getAllAdmins);
    // @desc get admin info by accesstoken
    this.router.get('/info', authMiddleware, roleMiddleware([Role.ADMIN]), userMiddleware, this.adminController.getAdminInfo);
    this.router.post('/', this.adminController.createAdmin);
    this.router.post('/instructor', this.adminController.createInstructor);
    this.router.post('/corporateTrainee', this.adminController.createCorporateTrainee);
    this.router.get('/email', this.adminController.getAdminByEmail);
    this.router.get('/username', this.adminController.getAdminByUsername);
  }
}

export default AdminRoute;
