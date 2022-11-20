import { HttpException } from '@/Exceptions/HttpException';
import { Role } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import { CreateTraineeDTO } from './trainee.dto';
import { EnrolledCourse, ITrainee } from './trainee.interface';
import traineeModel from './trainee.model';
import AuthService from '@Authentication/auth.dao';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose from 'mongoose';
import courseModel from '@/Course/course.model';
import { ICourse } from '@/Course/course.interface';

class TraineeService {
  public authService = new AuthService();
  //create trainee service
  public createCorporateTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    // User should be created before corporate trainee
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdCorporateTrainee = traineeModel.create({ ...traineeData });
    return createdCorporateTrainee;
  };

  public createIndividualTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdTrainee = traineeModel.create({ ...traineeData });
    return createdTrainee;
  };

  public getTraineeById = async (traineeId: string): Promise<ITrainee> => {
    const trainee: ITrainee = await traineeModel.findById(traineeId).select('-password');
    return trainee;
  };

  public getTraineeByEmail = async (traineeEmail: string): Promise<ITrainee> => {
    if (isEmpty(traineeEmail)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email is empty');
    const trainee: ITrainee = await traineeModel.findOne({ 'email.address': traineeEmail }).select('-password');
    return trainee;
  };

  // get trainee by username
  public getTraineeByUsername = async (traineeUsername: string): Promise<ITrainee> => {
    if (isEmpty(traineeUsername)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Username is empty');

    const trainee: ITrainee = await traineeModel.findOne({ username: traineeUsername }).select('-password');
    return trainee;
  };

  //delete trainee
  public deleteTrainee = async (traineeId: string): Promise<ITrainee> => {
    const deletedTrainee: ITrainee = await traineeModel.findByIdAndDelete(traineeId);
    return deletedTrainee;
  };

  //update trainee
  public updateTrainee = async (traineeId: string, traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const updatedTrainee = await traineeModel.findById(traineeId);
    updatedTrainee.set(traineeData);

    await updatedTrainee.save();

    return updatedTrainee;
  };

  //trainee sign up
  public addIndividualTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdTrainee = await this.authService.signup(traineeData, Role.TRAINEE);
    return createdTrainee;
  };

  //get trainee's enrolled courses
  public getTraineeEnrolledCourses = async (traineeId: string, page: number, pageLimit: number): Promise<PaginatedData<EnrolledCourse>> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');

    const trainee: ITrainee = await traineeModel.findById(traineeId).populate({
      path: '_enrolledCourses._course',
      //join with instructor
      populate: {
        path: '_instructor',
        select: 'rating.AverageRating name profileImage',
      },
      select: 'price rating.averageRating captions title duration language level previewVideoURL thumbnail category subcategory',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');

    const traineeEnrolledCourses = trainee._enrolledCourses;

    const toBeSkipped = (page - 1) * pageLimit;

    const totalCourses = traineeEnrolledCourses.length;
    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = traineeEnrolledCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalPages,
      totalResults: totalCourses,
    };
  };
  // enroll trainee in a course
  public enrollTrainee = async (traineeId: string, courseId: string): Promise<ICourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is invalid');

    const trainee = await traineeModel.findById(traineeId);
    const course = await courseModel.findById(courseId);

    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    course.numberOfEnrolledTrainees++;
    trainee._enrolledCourses.push({ _course: course, dateOfEnrollment: new Date() });

    await course.save();
    await trainee.save();

    return course;
  };

  // unroll trainee from a course
  public unrollTrainee = async (traineeId: string, courseId: string): Promise<ICourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is invalid');

    const trainee = await traineeModel.findById(traineeId);
    const course = await courseModel.findById(courseId);

    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    course.numberOfEnrolledTrainees--;

    // update trainee to remove course from his enrolled courses
    trainee._enrolledCourses = trainee._enrolledCourses.filter(enrolledCourse => enrolledCourse._course._id.toString() != courseId);
    await course.save();
    await trainee.save();

    return course;
  };
}
export default TraineeService;
