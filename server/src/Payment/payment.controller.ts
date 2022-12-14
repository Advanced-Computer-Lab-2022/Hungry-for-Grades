import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import PaymentService from './payment.dao';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { HttpResponse } from '@/Utils/HttpResponse';
import { HttpException } from '@/Exceptions/HttpException';

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

  // monthly payment controller
  public monthlyRevenue = async (req: Request, res: Response<HttpResponse<number[]>>, next: NextFunction) => {
    try {
      const { instructorId } = req.params;
      const country = (req.query.country as string) ?? 'US';
      const year = req.query.year as string;

      const yearInt = parseInt(year);
      if (isNaN(yearInt) || yearInt < 2000 || yearInt > 2100) {
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Invalid year');
      }

      const monthlyRevenues = await this.paymentService.getMonthlyRevenue(instructorId, yearInt, country);
      res.json({ data: monthlyRevenues, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // refund controller
  public refund = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const { traineeId, courseId } = req.params;
      await this.paymentService.refundPayment(traineeId, courseId);
      res.json({ data: null, message: 'Refund Successful', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController;
