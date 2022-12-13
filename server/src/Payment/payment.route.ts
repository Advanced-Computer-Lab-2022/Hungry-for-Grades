import { Routes } from '@/Common/Interfaces/routes.interface';
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
    this.router.post('/checkout/:traineeId', this.paymentController.checkout);
    this.router.post('/success/:traineeId', this.paymentController.savePayment);
    this.router.get('/monthly-revenue/:instructorId', this.paymentController.monthlyRevenue);

    this.router.delete('/:paymentId', this.paymentController.deletePayment);
  }
}

export default PaymentRoute;
