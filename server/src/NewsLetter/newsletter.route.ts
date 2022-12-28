import NewsController from '@NewsLetter/newsletter.controller';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import { allowedRoles, authenticateUser } from '@/Middlewares/auth.middleware';
import { AuthRole } from '@/Authentication/auth.interface';

class NewsletterRoute implements Routes {
  public path = '/newsletter';
  public router = Router();
  public newsController = new NewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // send User emails
    this.router.post('/', authenticateUser, allowedRoles([AuthRole.ADMIN]), this.newsController.sendEmails);
    // Users subscribe to emails
    this.router.post('/subscribe', this.newsController.subscribe); // guest
    // Users unsubscribe to emails
    this.router.delete('/unsubscribe', this.newsController.unsubscribe); // guest
    // filter Subscribers
    this.router.get('/subscribers', this.newsController.getAllEmails);
  }
}

export default NewsletterRoute;
