import { Rating, Review } from '@/Common/Types/common.types';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { Course, Price } from '@Course/course.interface';
import courseModel from '@Course/course.model';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import mongoose from 'mongoose';
import { CourseFilters, Category } from '@Course/course.types';
import { getCurrentPrice } from '@Course/course.common';
import instructorModel from '@/Instructor/instructor.model';
import userModel from '@/User/user.model';

class CourseService {
  public getAllCourses = async (filters: CourseFilters): Promise<PaginatedResponse<Course>> => {
    const { page, limit, searchTerm, category, subcategory, level, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    const filterQuery = {};
    if (category != undefined) filterQuery['category'] = category;
    if (level != undefined) filterQuery['level'] = { $eq: level };
    if (subcategory != undefined) filterQuery['subcategory'] = { $eq: subcategory };

    filterQuery['duration'] = { $gte: filters.durationLow, $lte: filters.durationHigh };
    filterQuery['price.currentValue'] = { $gte: filters.priceLow, $lte: filters.priceHigh }; // should be modified to compare with discounted price instead

    const aggregateQuery: any[] = [
      { $match: { $and: [filterQuery] } },
      {
        $lookup: {
          as: '_instructor',
          foreignField: '_id',
          from: 'instructors',
          localField: '_instructor',
        },
      },
      {
        $lookup: {
          as: '_instructor._user',
          foreignField: '_id',
          from: 'users',
          localField: '_instructor._user',
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $project: { 'rating.reviews': 0 } },
      {
        $match: {
          $or: [
            {
              title: {
                $options: 'i',
                $regex: searchTerm,
              },
            },
            {
              '_instructor._user': {
                $elemMatch: { name: { $options: 'i', $regex: searchTerm } },
              },
            },
          ],
        },
      },
    ];

    const sortQuery: any = {};
    if (sortBy == 0) sortQuery['numberOfEnrolledTrainees'] = -1;
    else if (sortBy == 1) sortQuery['rating.averageRating'] = -1;

    if (Object.keys(sortQuery).length != 0) aggregateQuery.push({ $sort: sortQuery });

    //console.log(sortQuery);

    let queryResult: Course[] = [];
    try {
      queryResult = await courseModel.aggregate(aggregateQuery);
    } catch {
      throw new HttpException(500, 'Internal error occured while fetching from database');
    }

    const totalPages = Math.ceil(queryResult.length / pageLimit);
    const paginatedCourses = queryResult.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const course of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(course.price, country);
      course.price = newPrice;
    }

    const pageSize = paginatedCourses.length;

    return {
      data: paginatedCourses,
      message: 'Completed Successfully',
      page,
      pageSize,
      success: true,
      totalPages,
    };
  };
  //get course by id aggregate
  public async getCourseById(courseId: string, country: string): Promise<Course> {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const REVIEWS_LIMIT = 5;
    country = country || 'United States';

    const course: Course = await courseModel
      .findById(courseId)
      .populate({
        model: instructorModel,
        path: '_instructor',
        populate: {
          model: userModel,
          path: '_user',
          select: { name: 1, profileImage: 1 },
        },
        select: { _user: 1, address: 1, 'rating.averageRating': 1 },
      })
      .populate({
        model: userModel,
        path: 'rating.reviews._user',
        select: { name: 1, profileImage: 1 },
      });

    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Course doesn't exist");
    course.rating.reviews
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice(0, REVIEWS_LIMIT);

    const newPrice = await getCurrentPrice(course.price, country);
    course.price = newPrice;

    return course;
  }

  public async createCourse(courseData: Course): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Data is empty');

    const course: Course = await courseModel.create(courseData);
    return course;
  }

  public async updateCourse(courseId: string, courseData: Course): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course data is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    // Rating should be modified pre save
    const updatedCourse: Course = await courseModel.findByIdAndUpdate(courseId, { courseData: courseData });
    if (!updatedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return updatedCourse;
  }

  public deleteCourse = async (courseId: string): Promise<Course> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    const deletedCourse: Course = await courseModel.findByIdAndDelete(courseId);
    if (!deletedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return deletedCourse;
  };

  public getAllCategories = async (): Promise<Category[]> => {
    let categoryList: Category[] = [];
    await courseModel.aggregate(
      [
        { $unwind: '$subcategory' },
        { $group: { _id: { cat: '$category', subcat: '$subcategory' } } },
        { $group: { _id: '$_id.cat', subcat: { $push: '$_id.subcat' } } },
        { $project: { _id: 0, name: '$_id', subcat: '$subcat' } },
      ],
      (err: any, result: Category[]) => {
        if (err) throw new HttpException(500, 'Internal error occured while fetching from database');
        categoryList = result;
      },
    );

    return categoryList;
  };

  public addRating = async (courseId: string, userReview: Review): Promise<Rating> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(userReview._user)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');
    if (!(await userModel.findById(userReview._user))) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User does not exist');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    course.rating.reviews.push(userReview);
    const totalReviews = course.rating.reviews.length;
    const newRating = (course.rating.averageRating * totalReviews + userReview.rating) / (totalReviews + 1);
    course.rating.averageRating = Math.round(newRating * 100) / 100;

    course.save();

    return {
      averageRating: course.rating.averageRating,
      reviews: course.rating.reviews.slice(-1),
    };
  };
}

export default CourseService;
