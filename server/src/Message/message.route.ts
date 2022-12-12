import { Routes } from '@Common/Interfaces/routes.interface';
import authMiddleware from '@/Middlewares/auth.middleware';

import { Router } from 'express';
import MessageController from './message.controller';

class MessageRoute implements Routes {
  public path = '/message';
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/addmsg/', this.messageController.addMessage);
    this.router.post('/getmsg/', authMiddleware, this.messageController.getMessages);
  }
}

export default MessageRoute;
