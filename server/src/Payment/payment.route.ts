import { AuthRole } from '@/Authentication/auth.interface';
import { Routes } from '@/Common/Interfaces/routes.interface';
import { allowedRoles, authenticateUser } from '@/Middlewares/auth.middleware';
import { Router } from 'express';
import PaymentController from './payment.controller';

class PaymentRoute implements Routes {
  public path = '/payment';
  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/checkout/:traineeId', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.paymentController.checkout);
    this.router.post('/success/:traineeId', authenticateUser, allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]), this.paymentController.savePayment);

    this.router.get('/monthly-revenue/:instructorId', this.paymentController.monthlyRevenue);

    this.router.delete('/:paymentId', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.paymentController.deletePayment);
    this.router.post(
      '/refund/trainee/:traineeId/course/:courseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE]),
      this.paymentController.refund,
    );
  }
}

export default PaymentRoute;
