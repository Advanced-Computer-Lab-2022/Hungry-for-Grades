import { HttpException } from '@/Exceptions/HttpException';
import { isEmpty } from '@/Utils/util';
import { HttpResponse } from '@/Utils/HttpResponse';
import { logger } from '@/Utils/logger';
import { sendEmail } from '@/Common/Email Service/nodemailer.service';
import { INewsletter } from './newsletter.interface';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import { NextFunction, Request, Response } from 'express';
import NewsLetterService from './newsletter.dao';
import { type INewsLetterFilters } from './newsletter.types';

class NewsController {
  public newsLetterService = new NewsLetterService();

  public getAllEmails = async (req: Request<{}, {}, {}, INewsLetterFilters>, res: Response<PaginatedResponse<INewsletter>>, next: NextFunction) => {
    try {
      const requestFilters: INewsLetterFilters = req.query;

      const newsLetterPaginatedResponse: PaginatedData<INewsletter> = (await this.newsLetterService.getAllEmails(
        requestFilters,
      )) as PaginatedData<INewsletter>;

      res.json({ ...newsLetterPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
  public sendEmails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, subject } = req.body;
      const requestFilters = req.query as unknown as INewsLetterFilters;
      if (isEmpty(req.body) && body && subject)
        throw new HttpException(400, 'Please provide the body and subject of the email to be sent to the users');
      const emails = await this.newsLetterService.getAllEmails(requestFilters);

      const emailPromises = emails.data.map(email => sendEmail(email.email, body, subject));

      await Promise.all(emailPromises);
      res.status(200).json({ message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public unsubscribe = async (req: Request<{}, {}, { email: string }, {}>, res: Response<HttpResponse<number>>, next: NextFunction) => {
    try {
      const { body } = req;

      const newsLetterPaginatedResponse = await this.newsLetterService.unsubscribe(body);

      res.json({ data: newsLetterPaginatedResponse.data, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public subscribe = async (req: Request<{}, {}, INewsletter, {}>, res: Response<HttpResponse<INewsletter>>, next: NextFunction) => {
    try {
      const newsLetterUser: { data: INewsletter } = await this.newsLetterService.subscribe(req.body);
      res.json({ ...newsLetterUser, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}
export default NewsController;
