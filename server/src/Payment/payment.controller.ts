import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import PaymentService from './payment.dao';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { HttpResponse } from '@/Utils/HttpResponse';

class PaymentController {
  public paymentService = new PaymentService();

  // checkout
  public checkout = async (req: Request, res: Response<HttpResponse<string>>, next: NextFunction) => {
    try {
      const { traineeId } = req.params;
      const country = req.query.country as string;

      const checkoutURL = await this.paymentService.checkoutStripe(traineeId, country);
      res.json({ data: checkoutURL, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //save payment controller
  public savePayment = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const { traineeId } = req.params;
      const country = req.query.country as string;

      await this.paymentService.savePayment(traineeId, country);
      res.status(201).json({ data: null, message: 'Payment Successful', success: true });
    } catch (error) {
      next(error);
    }
  };

  // delete payment controller
  public deletePayment = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const { paymentId } = req.params;
      await this.paymentService.deletePayment(paymentId);
      res.json({ data: null, message: 'Payment Deleted', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController;
