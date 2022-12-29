import { authenticateUser } from '@/Middlewares/auth.middleware';
import validationMiddleware from '@/Middlewares/validation.middleware';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import ReportController from './report.controller';
import { ReportDTO } from './report.dto';

class ReportRoute implements Routes {
  public path = '/report';
  public router = Router();
  public reportController = new ReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', authenticateUser, validationMiddleware(ReportDTO, 'body'), this.reportController.reportProblemOrRequestCourse); // guest??
    this.router.get('/', authenticateUser, this.reportController.getAllReports);
    this.router.get('/:reportId', authenticateUser, this.reportController.getReportById);
    this.router.delete('/:reportId', authenticateUser, this.reportController.deleteReport);
    this.router.patch('/:reportId', authenticateUser, validationMiddleware(ReportDTO, 'body'), this.reportController.updateReport);

    this.router.post('/:reportId/user/:userId', authenticateUser, this.reportController.addFollowUpMessage);
  }
}

export default ReportRoute;
