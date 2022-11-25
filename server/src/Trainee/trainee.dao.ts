import { HttpException } from '@/Exceptions/HttpException';
import { Role } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import { CartDTO, CreateTraineeDTO, WishlistDTO } from './trainee.dto';
import { Cart, EnrolledCourse, ITrainee, Wishlist } from './trainee.interface';
import traineeModel from './trainee.model';
import AuthService from '@Authentication/auth.dao';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose from 'mongoose';
import courseModel from '@/Course/course.model';
import { ICourse, Price } from '@/Course/course.interface';
import { getConversionRate, getCurrentPrice, getPriceAfterDiscount } from '@Course/course.common';
import { sendEmail } from '@/Common/Email Service/nodemailer.service';
import { sendResetPasswordEmail, sendVerificationEmail } from '@/Common/Email Service/email.template';
import CourseService from '@/Course/course.dao';

class TraineeService {
  public authService = new AuthService();
  public courseService = new CourseService();
  //create trainee service
  public createCorporateTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    // User should be created before corporate trainee
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdCorporateTrainee = traineeModel.create({ ...traineeData });
    return createdCorporateTrainee;
  };

  //sign up individual trainee service
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
      populate: {
        path: '_instructor',
        select: 'rating.AverageRating name profileImage',
      },
      select: 'price rating.averageRating captions title duration language level previewVideoURL thumbnail category subcategory',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');

    // date of completion null or undefined means not certified
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

  // get enrolled course info
  public getEnrolledCourseById = async (traineeId: string, courseId: string): Promise<EnrolledCourse> => {
    const trainee = await traineeModel.find({ '_enrolledCourses._course': courseId, _id: traineeId }).populate({
      match: { _id: courseId },
      path: '_enrolledCourses._course',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: '-rating.reviews -announcements -captions -coupouns  -outline -exam',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    // returns null if trainee is not enrolled in the course
    return trainee[0]?._enrolledCourses[0] ?? null;
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

  // add to cart
  public addToCart = async (traineeId: string, courseId: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $addToSet: { _cart: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    return trainee._cart;
  };
  // add to wishlist
  public addToWishlist = async (traineeId: string, courseId: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $addToSet: { _wishlist: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee._wishlist;
  };

  //remove from cart
  public removeFromCart = async (traineeId: string, courseId: string, country: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $pull: { _cart: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    const conversionRate = await getConversionRate(country);
    for (const course of trainee._cart) {
      course.price = await getCurrentPrice(course.price, conversionRate, country);
    }
    return trainee._cart;
  };

  public removeFromWishlist = async (traineeId: string, courseId: string, country: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $pull: { _wishlist: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    const conversionRate = await getConversionRate(country);
    for (const course of trainee._wishlist) {
      course.price = await getCurrentPrice(course.price, conversionRate, country);
    }

    return trainee._wishlist;
  };

  public getCart = async (traineeId: string, country: string, page: number, pageLimit: number): Promise<CartDTO> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');

    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_cart',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating price title description category subcategory thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    const conversionRate = await getConversionRate(country);

    const cartCourses = trainee._cart;
    let totalCost = 0;
    for (const course of cartCourses) {
      totalCost += getPriceAfterDiscount(course.price);
    }
    totalCost *= conversionRate;
    totalCost = Math.round(totalCost * 100) / 100;

    const totalCourses = cartCourses.length;
    const toBeSkipped = pageLimit * (page - 1);

    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = cartCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const cartCourse of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(cartCourse.price, conversionRate, country);
      cartCourse.price = newPrice;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalCost,
      totalPages,
      totalResults: totalCourses,
    };
  };

  public getWishlist = async (traineeId: string, country: string, page: number, pageLimit: number): Promise<WishlistDTO> => {
    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_wishlist',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating price title description category subcategory thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    //convert price to local currency
    const conversionRate = await getConversionRate(country);

    const wishlistCourses = trainee._wishlist;
    let totalCost = 0;
    for (const course of wishlistCourses) {
      totalCost += getPriceAfterDiscount(course.price);
    }
    totalCost *= conversionRate;
    totalCost = Math.round(totalCost * 100) / 100;

    const totalCourses = wishlistCourses.length;
    const toBeSkipped = pageLimit * (page - 1);

    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = wishlistCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const cartCourse of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(cartCourse.price, conversionRate, country);
      cartCourse.price = newPrice;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalCost,
      totalPages,
      totalResults: totalCourses,
    };
  };

  // empty wishlist
  public emptyWishlist = async (traineeId: string): Promise<ICourse[]> => {
    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $set: { _wishlist: [] } });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee._wishlist;
  };

  //empty cart
  public emptyCart = async (traineeId: string): Promise<ICourse[]> => {
    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $set: { _cart: [] } });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee._cart;
  };

  // get last viewed course
  public getLastViewedCourse = async (traineeId: string): Promise<ICourse> => {
    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_lastViewedCourse',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating price title description category subcategory thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    return trainee?._lastViewedCourse ?? null;
  };

  public getTraineeBalance = async (traineeId: string): Promise<number> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee: ITrainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee?.balance ?? 0;
  };

  // Updates trainee's progress in a course only if trainee is enrolled in that course
  public updateTraineeProgressInCourseIfEnrolled = async (userId: string, courseId: string, lessonId: string): Promise<void> => {
    const course = await this.courseService.getCourseById(courseId);

    //get total number of lessons in course
    const totalLessonsCount = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

    //add to visited lessons for trainee (only if trainee is enrolled in it)
    const trainee = await traineeModel.findById(userId);

    // Do nothing if trainee does not exist
    if (!trainee) return;

    // get matching enrolled course
    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) return;

    // add lesson to visited lessons if it is not already there
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    if (!enrolledCourse._visitedLessons.includes(lessonObjectId)) enrolledCourse._visitedLessons.push(lessonObjectId);

    // Update Progress for Student in enrolled course
    enrolledCourse.progress = (enrolledCourse._visitedLessons.length / totalLessonsCount) * 100;
    enrolledCourse.progress = Math.trunc(enrolledCourse.progress); //remove decimal part

    await trainee.save();
  };
}
export default TraineeService;
