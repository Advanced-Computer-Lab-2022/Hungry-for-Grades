import { Rating, Review } from '@/Common/Types/common.types';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { ICourse, Price, Question } from '@Course/course.interface';
import courseModel from '@Course/course.model';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose, { Document, Types } from 'mongoose';
import { CourseFilters, Category } from '@Course/course.types';
import {
  generateCoursesFilterQuery,
  generateCoursesSortQuery,
  getConversionRate,
  getCurrencyFromCountry,
  getCurrentPrice,
} from '@Course/course.common';
import instructorModel from '@/Instructor/instructor.model';
import userModel from '@/User/user.schema';
import { CategoryDTO, CourseDTO } from './course.dto';
import { IInstructor, ITeachedCourse } from '@/Instructor/instructor.interface';
import categories from '@Course/category.json';
import traineeModel from '@/Trainee/trainee.model';

class CourseService {
  public getAllCourses = async (filters: CourseFilters): Promise<PaginatedData<ICourse>> => {
    const { page, limit, searchTerm, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    // Get conversion rate to the desired currency based on input currency
    const conversionRate = await getConversionRate(country);
    const filterQuery = generateCoursesFilterQuery(filters);

    const aggregateQuery: any[] = [
      { $match: { $and: [filterQuery] } },
      {
        $lookup: {
          as: '_instructor',
          foreignField: '_id',
          from: 'instructors',
          localField: '_instructor',
          pipeline: [{ $project: { name: 1, profileImage: 1 } }],
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
              _instructor: {
                $elemMatch: { name: { $options: 'i', $regex: searchTerm } },
              },
            },
          ],
        },
      },
    ];

    const sortQuery: any = generateCoursesSortQuery(sortBy);
    if (Object.keys(sortQuery).length != 0) aggregateQuery.push({ $sort: sortQuery });

    let queryResult: ICourse[] = [];
    try {
      queryResult = await courseModel.aggregate(aggregateQuery);
    } catch (error) {
      throw new HttpException(500, 'Internal error occured while fetching from database');
    }

    const totalCourses = queryResult.length;
    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = queryResult.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const course of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(course.price, conversionRate, country);
      course.price = newPrice;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalPages,
      totalResults: totalCourses,
    };
  };

  // get max price across all courses
  public async getMaxPrice(country: string): Promise<number> {
    const queryResult = await courseModel.aggregate([
      {
        $group: {
          _id: null,
          maxPrice: { $max: '$price.currentValue' },
        },
      },
    ]);
    const conversionRate = await getConversionRate(country);
    const maxPrice = queryResult[0].maxPrice * conversionRate;
    return maxPrice;
  }

  public async getCoursesTaughtByInstructor(instructorId: string, filters: CourseFilters): Promise<PaginatedData<ITeachedCourse>> {
    if (isEmpty(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is empty');
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const { page, limit, searchTerm, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    // Get conversion rate to the desired currency based on input currency
    const conversionRate = await getConversionRate(country);

    const filterQuery = generateCoursesFilterQuery(filters);
    filterQuery['title'] = { $options: 'i', $regex: searchTerm };

    const sortQuery: any = generateCoursesSortQuery(sortBy);

    const instructor: IInstructor = await instructorModel.findById(instructorId).populate({
      match: filterQuery,
      model: courseModel,
      path: '_teachedCourses._course',
      select: '-rating.reviews',
      //sort: sortQuery,
    });

    //Remove nulls returned from mismatches when joining
    const courses: ITeachedCourse[] = instructor._teachedCourses.filter(course => course._course != null);

    const totalCourses = courses.length;
    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = courses.slice(toBeSkipped, toBeSkipped + pageLimit);

    //Get price after discount then change it to the needed currency
    for (const _teachedCourses of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(_teachedCourses._course.price, conversionRate, country);
      _teachedCourses._course.price = newPrice;
      _teachedCourses.earning = _teachedCourses.earning * conversionRate;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalPages,
      totalResults: totalCourses,
    };
  }

  //get course by id aggregate
  public async getCourseById(courseId: string, country: string): Promise<ICourse> {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    country = country || 'United States';

    const course: ICourse = await courseModel
      .findById(courseId)
      .populate({
        model: instructorModel,
        path: '_instructor',
        //exclude reviews from instructor
        select: '-rating.reviews -password -_teachedCourses',
      })
      .select('-_instructor.rating.reviews');
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Course doesn't exist");

    // Get conversion rate to the desired currency based on input currency
    const conversionRate = await getConversionRate(country);
    const newPrice = await getCurrentPrice(course.price, conversionRate, country);
    course.price = newPrice;

    return course;
  }

  public async createCourse(courseData: CourseDTO, country: string): Promise<ICourse> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Data is empty');
    if (!(await instructorModel.findById(courseData.instructorID))) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Instructor doesn't exist");

    const _instructor = [new mongoose.Types.ObjectId(courseData.instructorID)];
    delete courseData.instructorID;

    // Convert course price to USD before saving
    const inputCurrency = getCurrencyFromCountry(country);
    const conversionRate = await getConversionRate(country, true);
    const newPrice = courseData.price.currentValue * conversionRate;
    courseData.price = { ...courseData.price, currency: inputCurrency, currentValue: newPrice };

    const createdCourse: ICourse = await courseModel.create({ ...courseData, _instructor, rating: { averageRating: 0, reviews: [] } });

    // Link Instructor to Course
    await instructorModel.findByIdAndUpdate(_instructor[0], { $push: { _teachedCourses: { _course: createdCourse._id } } });

    return createdCourse;
  }

  public async updateCourse(courseId: string, courseData: ICourse): Promise<ICourse> {
    if (isEmpty(courseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course data is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const updatedCourse: ICourse = await courseModel.findByIdAndUpdate(courseId, { courseData: courseData });
    if (!updatedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return updatedCourse;
  }

  public deleteCourse = async (courseId: string): Promise<ICourse> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    const deletedCourse: ICourse = await courseModel.findByIdAndDelete(courseId);
    if (!deletedCourse) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //Delete course from instructor's teached courses
    await instructorModel.updateOne(
      { _teachedCourses: { $elemMatch: { _course: deletedCourse._id } } },
      { $pull: { _teachedCourses: { _course: deletedCourse._id } } },
    );
    return deletedCourse;
  };

  public getAllCategories = async (): Promise<CategoryDTO[]> => {
    const categoryList: CategoryDTO[] = [];

    for (const category of categories) {
      const categoryDTO: CategoryDTO = {
        label: category.name,
        subcategory: [],
      };
      const subcategoryList = [];
      for (const subcat of category.subcategory) {
        subcategoryList.push({ label: subcat });
      }
      categoryDTO['subcategory'] = subcategoryList;
      categoryList.push(categoryDTO);
    }
    return categoryList;
  };

  public addReviewToCourse = async (courseId: string, userReview: Review): Promise<Rating> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const traineeInfo = userReview._trainee;
    if (!mongoose.Types.ObjectId.isValid(traineeInfo._id)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');
    if (!(await traineeModel.findById(traineeInfo._id))) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User does not exist');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const totalReviews = course.rating.reviews.length;
    const newRating = (course.rating.averageRating * totalReviews + userReview.rating) / (totalReviews + 1);
    course.rating.averageRating = Math.round(newRating * 100) / 100;
    course.rating.reviews.push(userReview);

    await course.save();

    //Get Trainee Info
    userReview._trainee = await traineeModel.findById(traineeInfo._id).select('name address profileImage');

    return {
      averageRating: course.rating.averageRating,
      reviews: [userReview],
    };
  };

  // get all course reviews paginated
  public async getCourseReviews(courseID: string, page: number, pageLimit: number): Promise<PaginatedData<Review>> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID).populate({
      path: 'rating.reviews._trainee',
      select: 'name address profileImage',
    });

    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const toBeSkipped = (page - 1) * pageLimit;

    const courseReviews = course.rating.reviews;

    // sort course reviews by createdAt descendingly
    courseReviews.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const totalReviews = courseReviews.length;
    const totalPages = Math.ceil(totalReviews / pageLimit);
    const paginatedReviews = courseReviews.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedReviews,
      page,
      pageSize: paginatedReviews.length,
      totalPages,
      totalResults: totalReviews,
    };
  }

  //create exam for course
  public createExam = async (courseId: string, examData: Question[]): Promise<Question[]> => {
    if (isEmpty(examData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exam data is empty');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist');

    course.exam = examData;
    await course.save();

    return examData;
  };

  //get exam for course
  public getCourseExam = async (courseId: string): Promise<Question[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist');

    return course.exam;
  };
}
export default CourseService;
