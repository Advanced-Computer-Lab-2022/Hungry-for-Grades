import { Rating, Review } from '@/Common/Types/common.types';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { Course, Price } from '@Course/course.interface';
import courseModel from '@Course/course.model';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose, { Document, Types } from 'mongoose';
import { CourseFilters, Category } from '@Course/course.types';
import {
  convertCurrency,
  generateCoursesFilterQuery,
  generateCoursesSortQuery,
  getCurrencyFromCountry,
  getCurrentPrice,
} from '@Course/course.common';
import instructorModel from '@/Instructor/instructor.model';
import userModel from '@/User/user.model';
import { CourseDTO } from './course.dto';
import { IInstructor, ITeachedCourse } from '@/Instructor/instructor.interface';

class CourseService {
  public getAllCourses = async (filters: CourseFilters): Promise<PaginatedData<Course>> => {
    const { page, limit, searchTerm, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    const filterQuery = generateCoursesFilterQuery(filters);

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

    const sortQuery: any = generateCoursesSortQuery(sortBy);
    if (Object.keys(sortQuery).length != 0) aggregateQuery.push({ $sort: sortQuery });

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
      page,
      pageSize,
      totalPages,
    };
  };

  // public async getCoursesTaughtByInstructor(instructorId:string,filters: CourseFilters): Promise<PaginatedData<Course>> {
  //   if (isEmpty(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is empty');
  //   if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

  //   const { page, limit, searchTerm, category, subcategory, level, sortBy, country } = filters;
  //   const pageLimit: number = limit;
  //   const toBeSkipped = (page - 1) * pageLimit;

  //   const filterQuery = generateCoursesFilterQuery(filters);

  //   filterQuery['_instructor'] = instructorId;
  //   filterQuery['title'] = { $regex: searchTerm, $options: 'i' };

  //   // console.log(filterQuery);
  //   const sortQuery: any = generateCoursesSortQuery(sortBy);
  //   // console.log(sortQuery);

  //   const courses: Course[] = await courseModel.find(filterQuery,{'rating.reviews':0}).sort(sortQuery);

  //   const totalPages = Math.ceil(courses.length / pageLimit);
  //   const paginatedCourses = courses.slice(toBeSkipped, toBeSkipped + pageLimit);

  //    // Get price after discount then change it to the needed currency
  //    for (const course of paginatedCourses) {
  //     const newPrice: Price = await getCurrentPrice(course.price, country);
  //     course.price =newPrice;
  //   }

  //   return {
  //     data: paginatedCourses,
  //     page,
  //     pageSize: paginatedCourses.length,
  //     totalPages,
  //   };
  // }

  public async getCoursesTaughtByInstructor(instructorId: string, filters: CourseFilters): Promise<PaginatedData<ITeachedCourse>> {
    if (isEmpty(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is empty');
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const { page, limit, searchTerm, category, subcategory, level, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    const filterQuery = generateCoursesFilterQuery(filters);
    filterQuery['title'] = { $options: 'i', $regex: searchTerm };

    const sortQuery: any = generateCoursesSortQuery(sortBy);
    const instructor: IInstructor = await instructorModel.findById(instructorId).populate({
      match: filterQuery,
      model: courseModel,
      path: '_teachedCourses._course',
      select: '-rating.reviews',
      sort: sortQuery,
    });

    //Remove nulls returned from mismatches when joining
    const courses: ITeachedCourse[] = instructor._teachedCourses.filter(course => course._course != null);

    const totalPages = Math.ceil(courses.length / pageLimit);
    const paginatedCourses = courses.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    //  for (const course of paginatedCourses) {
    //   const newPrice: Price = await getCurrentPrice(course.price, country);
    //   course.price.currentValue =newPrice;
    // }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalPages,
    };
  }

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

  public async createCourse(courseData: CourseDTO, country: string): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Data is empty');
    if (!(await instructorModel.findById(courseData.instructorID))) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Instructor doesn't exist");

    const _instructor = [new mongoose.Types.ObjectId(courseData.instructorID)];
    delete courseData.instructorID;

    // Convert course price to USD when saving
    const inputCurrency = getCurrencyFromCountry(country);
    const newPrice = await convertCurrency(inputCurrency, 'USD', courseData.price.currentValue);
    courseData.price.currentValue = newPrice;

    const createdCourse: Course = await courseModel.create({ ...courseData, _instructor, rating: { averageRating: 0, reviews: [] } });

    // Link Instructor to Course
    await instructorModel.findByIdAndUpdate(_instructor[0], { $push: { _teachedCourses: { _course: createdCourse._id } } });

    return createdCourse;
  }

  public async updateCourse(courseId: string, courseData: Course): Promise<Course> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course data is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const updatedCourse: Course = await courseModel.findByIdAndUpdate(courseId, { courseData: courseData });
    if (!updatedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return updatedCourse;
  }

  public deleteCourse = async (courseId: string): Promise<Course> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    const deletedCourse: Course = await courseModel.findByIdAndDelete(courseId);
    if (!deletedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");


    //Delete course from instructor's teached courses
    await instructorModel.updateOne(
      { _teachedCourses: { $elemMatch: { _course: deletedCourse._id } } },
      { $pull: { _teachedCourses: { _course: deletedCourse._id } } }
    );
    return deletedCourse;
  };

  public getAllCategories = async (): Promise<Category[]> => {
    let categoryList: Category[] = [];
    await courseModel.aggregate(
      [
        { $unwind: '$subcategory' },
        { $group: { _id: { cat: '$category', subcat: '$subcategory' } } },
        { $group: { _id: '$_id.cat', subcat: { $push: { label: '$_id.subcat' } } } },
        { $project: { _id: 0, label: '$_id', subcategory: '$subcat' } },
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
