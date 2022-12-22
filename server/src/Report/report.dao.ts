import CourseService from '@/Course/course.dao';
import { HttpException } from '@/Exceptions/HttpException';
import InstructorService from '@/Instructor/instructor.dao';
import PaymentService from '@/Payment/payment.dao';
import TraineeService from '@/Trainee/trainee.dao';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose, { Types } from 'mongoose';
import { ReportDTO } from './report.dto';
import { Reason, Report, IReportFilters, Status, Message } from './report.interface';
import reportModel from './report.model';

class ReportService {
  traineeService = new TraineeService();
  courseService = new CourseService();
  instructorService = new InstructorService();
  paymentService = new PaymentService();

  public async reportProblemOrRequestCourse(reportData: ReportDTO): Promise<Report> {
    const courseId = reportData._course;
    const userId = reportData._user;

    //Validation
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId) && courseId != null)
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id can only be an Object Id or null');
    if ((reportData.reason === Reason.COUSE_REQUEST || reportData.reason === Reason.REFUND) && courseId == null)
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course Id is required for a Course Request or Refund Request');

    if (reportData.reason === Reason.REFUND) {
      // trainee should be enrolled in course and at least 50% of the course content should be seen
      const enrolledCourse = await this.traineeService.getEnrolledCourseById(userId, courseId);
      if (!enrolledCourse) throw new HttpException(422, 'Trainee is not enrolled in this course');

      const traineeProgress = enrolledCourse?.progress ?? 0;
      if (traineeProgress >= 50) throw new HttpException(422, 'Refund is not allowed after 50% of the course is completed');
      const report = await reportModel.findOne({ reason: 'Refund', _user: `${reportData?._user}`, _course: `${reportData?._course}` });
      if (report) {
        throw new HttpException(422, 'You have asked for refund for this course before');
      }

    }

    const report = await reportModel.create({ ...reportData });
    return report;
  }

  // get report by id
  public getReportById = async (reportId: string): Promise<Report> => {
    // return Info user & course
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');

    if (!report.isSeen) report.isSeen = true;
    return report;
  };

  public async updateReport(reportId: string, reportData: ReportDTO): Promise<Report> {
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');

    const courseId = reportData._course;
    if (reportData._course && !mongoose.Types.ObjectId.isValid(courseId) && courseId != null)
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id can only be an Object Id or null');

    //_user is not updated
    if (reportData.description) report.description = reportData.description;
    if (reportData.reason) report.reason = reportData.reason;
    //nullifying course ID is allowed
    if (reportData._course !== undefined) report._course = courseId == null ? null : new mongoose.Types.ObjectId(courseId);
    if (reportData.status) report.status = reportData.status;

    // Actions upon resolving a report/request
    if (reportData.status === Status.RESOLVED) {
      if (report.reason === Reason.COUSE_REQUEST) {
        // enroll trainee in course
        await this.traineeService.enrollTrainee(report._user.toString(), report._course.toString());
      } else if (report.reason === Reason.REFUND) {
        // refund trainee (only if less than 50% of the course has been attended)
        await this.paymentService.refundPayment(report._user.toString(), report._course.toString());

        //unroll trainee from course
        await this.traineeService.unrollTrainee(report._user.toString(), report._course.toString());
      }
    }

    if (!report.isSeen) report.isSeen = true;

    await report.save();
    return report;
  }

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
    if (reportFilters.reason) matchQuery['reason'] = { $in: reportFilters.reason };
    if (reportFilters.isSeen) matchQuery['isSeen'] = reportFilters.isSeen === 'true';

    const AndDateQuery = [];
    if (reportFilters.startDate) AndDateQuery.push({ createdAt: { $gte: new Date(reportFilters.startDate) } });
    if (reportFilters.endDate) AndDateQuery.push({ createdAt: { $lte: new Date(reportFilters.endDate) } });

    if (AndDateQuery.length > 0) matchQuery['$and'] = AndDateQuery;

    const aggregateQuery: any = [
      { $match: matchQuery },
      // get trainee Info (if role is trainee)
      {
        $lookup: {
          as: 'traineeInfo',
          foreignField: '_id',
          from: 'trainees',
          localField: '_user',
          pipeline: [{ $project: { country: 1, isCorporate: 1, name: 1, profileImage: 1, corporate: 1 } }],
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
      { $project: { __v: 0, _user: 0, updatedAt: 0, isSeen: 0 } },
    ];

    // Sorting by createdAt
    reportFilters.sort = parseInt(`${reportFilters.sort}`);
    if (reportFilters.sort == 1 || reportFilters.sort == -1) aggregateQuery.push({ $sort: { createdAt: reportFilters.sort } });

    //aggregate query
    const reports = await reportModel.aggregate(aggregateQuery);

    const { page, limit } = reportFilters;
    const toBeSkipped = (page - 1) * limit;

    const totalReports = reports.length;
    const totalPages = Math.ceil(totalReports / limit);
    const paginatedReports = reports.slice(toBeSkipped, toBeSkipped + limit);

    // mark paginated reports as seen
    const reportIds = paginatedReports.map(report => report._id);
    await reportModel.updateMany({ _id: { $in: reportIds } }, { $set: { isSeen: true } });

    return {
      data: paginatedReports,
      page,
      pageSize: paginatedReports.length,
      totalPages,
      totalResults: totalReports,
    };
  };

  // add a followup to a report
  public addMessageToFollowUp = async (userId: string, reportId: string, message: Message): Promise<Report> => {
    const report = await reportModel.findById(reportId);
    if (!report) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Report not found');

    const isAdmin = userId === report._user.toString() ? false : true;

    if (!report.followUp) report.followUp = [];
    report.followUp.push({ ...message, isAdmin, createdAt: new Date() });
    await report.save();

    return report;
  };
}

export default ReportService;
