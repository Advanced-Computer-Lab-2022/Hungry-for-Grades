import CourseService from '@/Course/course.dao';
import { HttpException } from '@/Exceptions/HttpException';
import InstructorService from '@/Instructor/instructor.dao';
import TraineeService from '@/Trainee/trainee.dao';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose from 'mongoose';
import { Reason, Report, ReportDTO, IReportFilters, Status } from './report.interface';
import reportModel from './report.model';

class ReportService {
  traineeService = new TraineeService();
  courseService = new CourseService();
  instructorService = new InstructorService();

  //corporate trainee requests a course
  public async reportProblemOrRequestCourse(reportData: ReportDTO): Promise<Report> {
    const courseId = reportData._course;
    const traineeId = reportData._user;

    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await this.traineeService.getTraineeById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');

    const course = await this.courseService.getCourseById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    // get _user && role from token & remove from ReportDTO
    const report = await reportModel.create({ ...reportData, reason: Reason.COUSE_REQUEST, role: 'Trainee' });
    return report;
  }

  //admin rejects a report
  public async rejectReport(reportId: string): Promise<Report> {
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');

    report.status = Status.REJECTED;
    await report.save();
    return report;
  }

  //admin resolves a report
  public async resolveReport(reportId: string): Promise<Report> {
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');

    if (report.reason === Reason.COUSE_REQUEST) {
      // enroll trainee in course
      await this.traineeService.enrollTrainee(report._user.toString(), report._course.toString());
    } else if (report.reason === Reason.REFUND) {
      // refund trainee

      //unroll trainee from course
      await this.traineeService.unrollTrainee(report._user.toString(), report._course.toString());
    }

    report.status = Status.RESOLVED;
    await report.save();
    return report;
  }

  // get report by id
  public getReportById = async (reportId: string) => {
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');
    return report;
  };

  //delete report
  public deleteReport = async (reportId: string) => {
    const report = await reportModel.findByIdAndDelete(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');
    return report;
  };

  // get all reports with pagination and filters
  public getAllReports = async (reportFilters: IReportFilters): Promise<PaginatedData<Report>> => {
    //prepare match query
    const matchQuery: object = {};
    if (reportFilters._course) matchQuery['_course'] = reportFilters._course;
    if (reportFilters._user) matchQuery['_user'] = reportFilters._user;
    if (reportFilters.status) matchQuery['status'] = reportFilters.status;
    if (reportFilters.reason) matchQuery['reason'] = reportFilters.reason;
    if (reportFilters.startDate) matchQuery['dateIssued'] = { $gte: reportFilters.startDate };
    if (reportFilters.endDate) matchQuery['dateIssued'] = { $lte: reportFilters.endDate };

    //aggregate query
    const reports = await reportModel.aggregate([
      { $match: matchQuery },
      // match with trainee (if role is trainee)
      {
        $lookup: {
          as: '_user',
          foreignField: '_id',
          from: 'trainees',
          localField: '_user',
        },
      },
      // match with instructor (if role is instructor)
      {
        $lookup: {
          as: '_user',
          foreignField: '_id',
          from: 'instructors',
          localField: '_user',
        },
      },
    ]);

    const { page, limit } = reportFilters;
    const toBeSkipped = (page - 1) * limit;

    const totalReports = reports.length;
    const totalPages = Math.ceil(totalReports / limit);
    const paginatedReports = reports.slice(toBeSkipped, toBeSkipped + limit);

    return {
      data: paginatedReports,
      page,
      pageSize: paginatedReports.length,
      totalPages,
      totalResults: totalReports,
    };
  };
}

export default ReportService;
