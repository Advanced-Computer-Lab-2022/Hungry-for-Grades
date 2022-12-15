import { Rating, Review, ReviewDTO } from '@/Common/Types/common.types';
import { FrequentlyAskedQuestionDTO } from '@/Course/course.dto';
import { HttpException } from '@/Exceptions/HttpException';
import instructorModel from '@/Instructor/instructor.model';
import traineeModel from '@/Trainee/trainee.model';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData } from '@/Utils/PaginationResponse';
import { IInstructor, SocialMedia } from '@Instructor/instructor.interface';
import mongoose from 'mongoose';
import { isEmpty } from '../Utils/util';
import { CreateInstructorDTO } from './instructor.dto';

class InstructorService {
  public async findInstructorById(instructorID: string): Promise<IInstructor> {
    if (isEmpty(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is empty');

    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor: IInstructor = await instructorModel.findById(instructorID).select('-password -bankAccount -rating.reviews -balance');
    return instructor;
  }
  public async findInstructors(): Promise<IInstructor[]> {
    const instructors: IInstructor[] = await instructorModel.find().select('-password -bankAccount -rating.reviews -_teachedCourses -balance');
    return instructors;
  }

  public async createInstructor(instructorData: CreateInstructorDTO): Promise<IInstructor> {
    if (isEmpty(instructorData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');

    const createdInstructor = instructorModel.create({ ...instructorData, rating: { averageRating: 0, ratings: [] } });
    return createdInstructor;
  }

  // add social media links to instructor
  public async addSocialMedia(instructorID: string, inputSocialMedia: SocialMedia): Promise<IInstructor> {
    if (isEmpty(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor id is empty');

    const updatedInstructor = await instructorModel.findById(instructorID);
    updatedInstructor.socialMedia = inputSocialMedia;
    await updatedInstructor.save();

    return updatedInstructor;
  }

  // add rating to instructor
  public async addReviewToInstructor(instructorID: string, userReview: Review): Promise<Rating> {
    if (isEmpty(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor id is empty');
    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const traineeInfo = userReview._trainee;
    if (!mongoose.Types.ObjectId.isValid(traineeInfo._id)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!(await traineeModel.findById(traineeInfo._id))) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const instructor = await instructorModel.findById(instructorID);
    if (!instructor) throw new HttpException(HttpStatusCodes.CONFLICT, "Instructor doesn't exist");

    const totalReviews = instructor.rating.reviews.length;
    const newRating = (instructor.rating.averageRating * totalReviews + userReview.rating) / (totalReviews + 1);
    instructor.rating.averageRating = Math.round(newRating * 100) / 100; // round to 2 d.p.
    instructor.rating.reviews.push(userReview);

    await instructor.save();
    //Get Trainee Info
    userReview._trainee = await traineeModel.findById(traineeInfo._id).select('name country profileImage');

    return {
      averageRating: instructor.rating.averageRating,
      reviews: [userReview],
    };
  }

  // get all instructor ratings paginated
  public async getInstructorReviews(instructorID: string, page: number, pageLimit: number): Promise<PaginatedData<Review>> {
    if (isEmpty(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor id is empty');
    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorID).populate({
      path: 'rating.reviews._trainee',
      select: 'name country profileImage',
    });

    if (!instructor) throw new HttpException(HttpStatusCodes.CONFLICT, "Instructor doesn't exist");

    const toBeSkipped = (page - 1) * pageLimit;

    const instructorReviews = instructor.rating.reviews;

    // sort instructor reviews by createdAt descendingly
    instructorReviews.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const totalReviews = instructorReviews.length;
    const totalPages = Math.ceil(totalReviews / pageLimit);
    const paginatedReviews = instructorReviews.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedReviews,
      page,
      pageSize: paginatedReviews.length,
      totalPages,
      totalResults: totalReviews,
    };
  }

  // delete user review on instructor
  public async deleteReview(instructorID: string, traineeID: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorID);
    if (!instructor) throw new HttpException(HttpStatusCodes.CONFLICT, "Instructor doesn't exist");

    const reviewIndex = instructor.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeID);
    if (reviewIndex === -1) return;

    const userReview = instructor.rating.reviews[reviewIndex];

    const totalReviews = instructor.rating.reviews.length;
    const newRating = (instructor.rating.averageRating * totalReviews - userReview.rating) / (totalReviews - 1);
    instructor.rating.averageRating = Math.round(newRating * 100) / 100;
    instructor.rating.reviews.splice(reviewIndex, 1);

    await instructor.save();
  }

  // update user review
  public async updateReview(instructorID: string, traineeID: string, reviewData: ReviewDTO): Promise<Review> {
    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorID);
    if (!instructor) throw new HttpException(HttpStatusCodes.CONFLICT, "Instructor doesn't exist");

    const reviewIndex = instructor.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeID);
    if (reviewIndex === -1) return;

    const userReview = instructor.rating.reviews[reviewIndex];

    const totalReviews = instructor.rating.reviews.length;
    // old rating removed and replaced by the new one
    const newRating = (instructor.rating.averageRating * totalReviews - userReview.rating + reviewData.rating) / totalReviews;
    instructor.rating.averageRating = Math.round(newRating * 100) / 100;
    instructor.rating.reviews[reviewIndex].rating = reviewData.rating;
    instructor.rating.reviews[reviewIndex].comment = reviewData.comment;

    await instructor.save();

    return instructor.rating.reviews[reviewIndex];
  }

  // get User Review on Instructor
  public async getUserReview(instructorID: string, traineeID: string): Promise<Review> {
    if (!mongoose.Types.ObjectId.isValid(instructorID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorID);
    if (!instructor) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Instructor doesn't exist");

    const reviewIndex = instructor.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeID);
    if (reviewIndex === -1) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Review doesn't exist");

    return instructor.rating.reviews[reviewIndex];
  }

  //update instructor profile
  public async updateInstructor(instructorId: string, instructorData: CreateInstructorDTO): Promise<IInstructor> {
    if (isEmpty(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor id is empty');
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const updatedInstructor = await instructorModel.findById(instructorId);
    if (!updatedInstructor) throw new HttpException(HttpStatusCodes.CONFLICT, "Instructor doesn't exist");

    updatedInstructor.set(instructorData);
    await updatedInstructor.save();

    return updatedInstructor;
  }

  public getInstructorByEmail = async (instructorEmail: string): Promise<IInstructor> => {
    if (isEmpty(instructorEmail)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email is empty');

    const instructor: IInstructor = await instructorModel.findOne({ 'email.address': instructorEmail }).select('-password');
    return instructor;
  };

  // get instructor by username
  public getInstructorByUsername = async (instructorUsername: string): Promise<IInstructor> => {
    if (isEmpty(instructorUsername)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Username is empty');

    const instructor: IInstructor = await instructorModel.findOne({ username: instructorUsername }).select('-password');
    return instructor;
  };

  // get instructor's balance
  public getInstructorBalance = async (instructorId: string): Promise<number> => {
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor: IInstructor = await instructorModel.findById(instructorId);
    if (!instructor) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor does not exist');
    return instructor?.balance ?? 0;
  };

  // get top rated instructors
  public getTopRatedInstructors = async (page: number, pageLimit: number): Promise<PaginatedData<IInstructor>> => {
    const instructors = await instructorModel
      .find()
      .sort({ 'rating.averageRating': -1 })
      .select('name profileImage rating.averageRating speciality title country');

    const toBeSkipped = (page - 1) * pageLimit;
    const totalInstructors = instructors.length;
    const totalPages = Math.ceil(totalInstructors / pageLimit);
    const paginatedInstructors = instructors.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedInstructors,
      page,
      pageSize: paginatedInstructors.length,
      totalPages,
      totalResults: totalInstructors,
    };
  };

  // update Instructor's earning in course
  // profit param should be after deducting the platform fee and it should be in dollars
  public updateInstructorEarningAndBalance = async (instructorId: string, courseId: string, profit: number): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorId);
    if (!instructor) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor does not exist');

    // get teached course
    const course = instructor._teachedCourses.find(teachedCourse => teachedCourse._course.toString() === courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist or is not teached by this instructor');

    // balance & earnings can be negative (if instructor owes money to the platform)
    course.earning += profit;
    instructor.balance += profit;

    await instructor.save();
  };

  // adjust instructor's balance after refund
  // both profit params should be after deducting the platform fee and should be in dollars
  public adjustBalanceAfterRefund = async (instructorId: string, courseId: string, oldProfit: number, newProfit: number): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const instructor = await instructorModel.findById(instructorId);
    if (!instructor) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor does not exist');

    // get teached course
    const course = instructor._teachedCourses.find(teachedCourse => teachedCourse._course.toString() === courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist or is not teached by this instructor');

    let netProfit = newProfit - oldProfit;
    netProfit = Math.round(netProfit * 100) / 100;

    // balance & earnings can be negative (if instructor owes money to the platform)
    instructor.balance += netProfit;
    course.earning += netProfit;

    await instructor.save();
  };
}
export default InstructorService;
