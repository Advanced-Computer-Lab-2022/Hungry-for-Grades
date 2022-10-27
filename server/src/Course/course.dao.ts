import { Course, Price } from '@Course/course.interface';
import CourseModel from '@Course/course.model';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PaginatedResponse } from '@/utils/PaginationResponse';
import mongoose from 'mongoose';
import { CourseFilters, Category } from '@Course/course.types';
import courseModel from '@Course/course.model';
import { displayCurrentPrice } from '@Course/course.common';

// const instructorModel = require('@Instructor/instrutor.model');
// const userModel = require('@User/user.model');

class CourseService {
  public getAllCourses = async (filters: CourseFilters): Promise<PaginatedResponse<Course>> => {
    const { page, limit, searchTerm, category, subcategory, level, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    const filterQuery = {};
    if (category != undefined) filterQuery['category'] = category; //{$eq:category};
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
    await courseModel.aggregate(aggregateQuery, (err: any, result: Course[]) => {
      if (err) throw new HttpException(500, 'Internal error occured while fetching from database');
      queryResult = result;
    });

    const totalPages = Math.ceil(queryResult.length / pageLimit);
    const paginatedCourses = queryResult.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const course of paginatedCourses) {
      const newPrice: Price = await displayCurrentPrice(course.price, country);
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

  public async findCourseById(courseId: string): Promise<Course> {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course: Course = await CourseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course;
  }

  public async createCourse(courseData: Course): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Data is empty');

    // Rating should be modified pre save
    const course: Course = await CourseModel.create(courseData);
    return course;
  }

  public async updateCourse(courseId: string, courseData: Course): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course data is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    // Rating should be modified pre save
    const updatedCourse: Course = await CourseModel.findByIdAndUpdate(courseId, { courseData: courseData });
    if (!updatedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return updatedCourse;
  }

  public deleteCourse = async (courseId: string): Promise<Course> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    const deletedCourse: Course = await CourseModel.findByIdAndDelete(courseId);
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
}

export default CourseService;
