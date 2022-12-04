import { HttpResponse } from '@Utils/HttpResponse';
import HttpStatusCodes from '@Utils/HttpStatusCodes';
import { NextFunction, Request, Response } from 'express';
import ReportService from './report.dao';
import { IReportFilters, Report, ReportDTO } from './report.interface';

class ReportController {
  public reportService = new ReportService();

  //request a course controller
  public reportProblemOrRequestCourse = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const reportData: ReportDTO = req.body;
      const createdReport = await this.reportService.reportProblemOrRequestCourse(reportData);
      res.status(HttpStatusCodes.CREATED).json({ data: createdReport, message: 'Request Created Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // resolve report controller
  public resolveReport = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const updatedReport = await this.reportService.resolveReport(reportId);
      res.status(HttpStatusCodes.OK).json({ data: updatedReport, message: 'Report Resolved Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //reject report controller
  public rejectReport = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const updatedReport = await this.reportService.rejectReport(reportId);
      res.status(HttpStatusCodes.OK).json({ data: updatedReport, message: 'Report Rejected Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get report by id
  public getReportById = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const report = await this.reportService.getReportById(reportId);
      res.status(HttpStatusCodes.OK).json({ data: report, message: 'Report Rejected Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  //delete report
  public deleteReport = async (req: Request, res: Response<HttpResponse<Report>>, next: NextFunction) => {
    try {
      const { reportId } = req.params;
      const report = await this.reportService.deleteReport(reportId);
      res.status(HttpStatusCodes.OK).json({ data: report, message: 'Report Deleted Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get all reports controller
  public getAllReports = async (req: Request<{}, {}, {}, IReportFilters>, res: Response<HttpResponse<Report[]>>, next: NextFunction) => {
    try {
      const reportFilters = req.query;
      const paginatedReponse = await this.reportService.getAllReports(reportFilters);
      res.status(HttpStatusCodes.OK).json({ ...paginatedReponse, message: 'Reports Retrieved Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default ReportController;
