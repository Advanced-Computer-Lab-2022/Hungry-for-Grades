import NewsController from '@NewsLetter/newsletter.controller';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';

class NewsletterRoute implements Routes {
  public path = '/newsletter';
  public router = Router();
  public newsController = new NewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // send User emails
    this.router.post('/', this.newsController.sendEmails);
    // Users subscribe to emails
    this.router.post('/subscribe', this.newsController.subscribe);
    // Users unsubscribe to emails
    this.router.delete('/unsubscribe', this.newsController.unsubscribe);
    // get User emails
    this.router.get('/emails', this.newsController.getAllEmails);
  }
}

export default NewsletterRoute;
