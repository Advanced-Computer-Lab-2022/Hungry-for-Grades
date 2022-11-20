import { Rating, Review } from '@/Common/Types/common.types';
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

    const instructor: IInstructor = await instructorModel
      .findById(instructorID)
      .select('-password -bankAccount -rating.reviews -_teachedCourses -balance');
    return instructor;
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
    userReview._trainee = await traineeModel.findById(traineeInfo._id).select('name address profileImage');

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
      select: 'name address profileImage',
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
}
export default InstructorService;
