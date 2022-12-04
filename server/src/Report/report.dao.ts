import CourseService from '@/Course/course.dao';
import { HttpException } from '@/Exceptions/HttpException';
import InstructorService from '@/Instructor/instructor.dao';
import TraineeService from '@/Trainee/trainee.dao';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData } from '@/Utils/PaginationResponse';
import { DESTRUCTION } from 'dns';
import mongoose from 'mongoose';
import { ReportDTO } from './report.dto';
import { Reason, Report, IReportFilters, Status } from './report.interface';
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

    // get _user from token & remove from ReportDTO
    const report = await reportModel.create({ ...reportData });
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
    if (reportFilters._course) matchQuery['_course'] = new mongoose.Types.ObjectId(reportFilters._course);
    if (reportFilters._user) matchQuery['_user'] = new mongoose.Types.ObjectId(reportFilters._user);
    if (reportFilters.status) matchQuery['status'] = reportFilters.status;
    if (reportFilters.reason) matchQuery['reason'] = reportFilters.reason;

    const AndDateQuery = [];
    if (reportFilters.startDate) AndDateQuery.push({ createdAt: { $gte: new Date(reportFilters.startDate) } });
    if (reportFilters.endDate) AndDateQuery.push({ createdAt: { $lte: new Date(reportFilters.endDate) } });

    matchQuery['$and'] = AndDateQuery;

    //aggregate query
    const reports = await reportModel.aggregate([
      { $match: matchQuery },
      // get trainee Info (if role is trainee)
      {
        $lookup: {
          as: 'traineeInfo',
          foreignField: '_id',
          from: 'trainees',
          localField: '_user',
          pipeline: [{ $project: { country: 1, isCoporate: 1, name: 1, profileImage: 1 } }],
        },
      },
      // get Instructor Info (if role is Instructor)
      {
        $lookup: {
          as: 'instructorInfo',
          foreignField: '_id',
          from: 'instructors',
          localField: '_user',
          pipeline: [{ $project: { country: 1, name: 1, profileImage: 1 } }],
        },
      },
      // get course Info
      {
        $lookup: {
          as: '_course',
          foreignField: '_id',
          from: 'courses',
          localField: '_course',
          pipeline: [{ $project: { category: 1, subcategory: 1, thumbnail: 1, title: 1 } }],
        },
      },
      { $project: { __v: 0, _user: 0, updatedAt: 0 } },
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
