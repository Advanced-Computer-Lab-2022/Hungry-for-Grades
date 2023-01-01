import { Rating, Review, ReviewDTO } from '@/Common/Types/common.types';
import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { Announcement, FrequentlyAskedQuestion, ICourse, Price, Question, Discount, Section, Lesson, Exercise } from '@Course/course.interface';
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
import { CategoryDTO, CourseDTO, FrequentlyAskedQuestionDTO } from './course.dto';
import { ITeachedCourse } from '@/Instructor/instructor.interface';
import categories from '@Course/category.json';
import traineeModel from '@/Trainee/trainee.model';
import TraineeService from '@/Trainee/trainee.dao';
import { logger } from '@/Utils/logger';
import { ITrainee } from '@/Trainee/trainee.interface';

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
      {
        $project: {
          __v: 0,
          announcements: 0,
          exam: 0,
          keywords: 0,
          sections: 0,
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
    if (!mongoose.Types.ObjectId.isValid(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is an invalid Object Id');

    const { page, limit, searchTerm, sortBy, country } = filters;
    const pageLimit: number = limit;
    const toBeSkipped = (page - 1) * pageLimit;

    // Get conversion rate to the desired currency based on input currency
    const conversionRate = await getConversionRate(country);

    const filterQuery = generateCoursesFilterQuery(filters);
    filterQuery['title'] = { $options: 'i', $regex: searchTerm };

    // const populateQuery:any={
    //   match: filterQuery,
    //   model: courseModel,
    //   path: '_teachedCourses._course',
    //   select: '-rating.reviews -announcements -exam -sections',
    // };

    //const instructor: IInstructor = await instructorModel.findById(instructorId).populate(populateQuery).exec();

    //Remove nulls returned from mismatches when joining
    //const courses: ITeachedCourse[] = instructor._teachedCourses.filter(course => course._course != null);

    // for (const _teachedCourses of paginatedCourses) {
    //   const newPrice: Price = await getCurrentPrice(_teachedCourses._course.price, conversionRate, country);
    //   _teachedCourses._course.price = newPrice;
    //   _teachedCourses.earning = _teachedCourses.earning * conversionRate;
    // }

    const pipelineQuery: any = [
      { $match: { $and: [filterQuery] } },
      {
        $project: {
          category: 1,
          description: 1,
          duration: 1,
          langauge: 1,
          level: 1,
          numberOfEnrolledTrainees: 1,
          previewVideoURL: 1,
          price: 1,
          'rating.averageRating': 1,
          subcategory: 1,
          thumbnail: 1,
          title: 1,
          examGrades: 1,
        },
      },
    ];

    let queryResult: any = [];
    const aggregateQuery: any = [
      { $match: { _id: new mongoose.Types.ObjectId(instructorId) } },
      { $project: { _teachedCourses: 1 } },
      { $unwind: '$_teachedCourses' },
      {
        $lookup: {
          as: '_teachedCourses._course',
          foreignField: '_id',
          from: 'courses',
          localField: '_teachedCourses._course',
          pipeline: pipelineQuery,
        },
      },
      { $unwind: '$_teachedCourses._course' },
      { $sort: { '_teachedCourses._course.numberOfEnrolledTrainees': -1 } },
    ];

    const sortQuery: any = generateCoursesSortQuery(sortBy);
    if (Object.keys(sortQuery).length != 0) {
      const sortQuery: any = {};
      if (sortBy == 0) sortQuery['_teachedCourses._course.numberOfEnrolledTrainees'] = -1;
      else if (sortBy == 1) sortQuery['_teachedCourses._course.rating.averageRating'] = -1;
      aggregateQuery.push({ $sort: sortQuery });
    }

    // group by
    aggregateQuery.push({ $group: { _id: '$_id', _teachedCourses: { $push: '$_teachedCourses' } } });
    //osa
    // get total count
    // aggregateQuery.push({ $project: { _teachedCourses: 1, count: { $size: '$_teachedCourses' } } });
    // skip
    //aggregateQuery.push({ $project: { _teachedCourses: { $slice: ['$_teachedCourses', toBeSkipped, pageLimit] }, count: 1 } });

    //aggregateQuery.push({ $skip: toBeSkipped });
    //  aggregateQuery.push({ $limit: pageLimit });
    try {
      queryResult = await instructorModel.aggregate(aggregateQuery);
    } catch (error) {
      throw new HttpException(500, 'Internal error occured while fetching from database');
    }

    const teachedCourses: ITeachedCourse[] = queryResult[0]?._teachedCourses ?? [];

    const totalCourses = teachedCourses.length;
    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = teachedCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    //Get price after discount then change it to the needed currency
    for (const teachedCourse of paginatedCourses) {
      const course = teachedCourse._course;

      const newPrice: Price = await getCurrentPrice(course.price, conversionRate, country);
      course.price = newPrice;
      teachedCourse.earning = teachedCourse.earning * conversionRate;
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
  public async getCourseById(courseId: string, country = 'US'): Promise<ICourse> {
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

  public async updateCourse(courseId: string, newCourseData: any): Promise<ICourse> {
    if (isEmpty(newCourseData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course data is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findOneAndReplace({ _id: new mongoose.Types.ObjectId(courseId) }, newCourseData, { new: true });
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Course doesn't exist");

    return course;
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

  public addReviewToCourse = async (courseId: string, traineeId: string, userReview: Review): Promise<Rating> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    if (!(await traineeModel.findById(traineeId))) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const trainee = await traineeModel.findById(traineeId).select('name country profileImage');
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User does not exist');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // check if the user already reviewed the course
    const userReviewIndex = course.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeId);
    if (userReviewIndex >= 0) throw new HttpException(HttpStatusCodes.CONFLICT, 'You already reviewed this course');

    userReview._trainee = traineeId as unknown as ITrainee;
    const totalReviews = course.rating.reviews.length;
    const newRating = (course.rating.averageRating * totalReviews + userReview.rating) / (totalReviews + 1);
    course.rating.averageRating = Math.round(newRating * 100) / 100;
    course.rating.reviews.push(userReview);

    await course.save();

    //Assign Trainee Info
    userReview._trainee = trainee;

    return {
      averageRating: course.rating.averageRating,
      reviews: [userReview],
    };
  };

  // get all course reviews paginated
  public async getCourseReviews(courseID: string, page: number, pageLimit: number): Promise<PaginatedData<Review>> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID).populate({
      path: 'rating.reviews._trainee',
      select: 'name country profileImage',
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

  // get user review on course
  public async getUserReviewOnCourse(courseID: string, traineeID: string): Promise<Review> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const userReview = course.rating.reviews.find(review => review._trainee._id.toString() === traineeID.toString());
    if (!userReview) throw new HttpException(HttpStatusCodes.NOT_FOUND, "You haven't reviewed this course yet");

    return userReview;
  }

  // delete user review on course
  public async deleteUserReviewOnCourse(courseID: string, traineeID: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const userReviewIndex = course.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeID.toString());
    if (userReviewIndex == -1) return;
    //throw new HttpException(HttpStatusCodes.NOT_FOUND, "You haven't reviewed this course yet");

    const userReview = course.rating.reviews[userReviewIndex];

    const totalReviews = course.rating.reviews.length;
    if (totalReviews !== 1) {
      const newRating = (course.rating.averageRating * totalReviews - userReview.rating) / (totalReviews - 1);
      course.rating.averageRating = Math.round(newRating * 100) / 100;
    } else {
      course.rating.averageRating = 0;
    }
    course.rating.reviews.splice(userReviewIndex, 1);

    await course.save();
  }

  // update review on course
  public async updateUserReviewOnCourse(courseID: string, traineeID: string, userReview: ReviewDTO): Promise<Review> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(traineeID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");
    console.log(course.rating.reviews);

    const userReviewIndex = course.rating.reviews.findIndex(review => review._trainee._id.toString() === traineeID.toString());
    if (userReviewIndex == -1) return;

    const oldUserReview = course.rating.reviews[userReviewIndex];

    const totalReviews = course.rating.reviews.length;
    const newRating = (course.rating.averageRating * totalReviews - oldUserReview.rating + userReview.rating) / totalReviews;
    course.rating.averageRating = Math.round(newRating * 100) / 100;
    course.rating.reviews[userReviewIndex].rating = userReview.rating;
    course.rating.reviews[userReviewIndex].comment = userReview.comment;

    await course.save();

    return course.rating.reviews[userReviewIndex];
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
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist');

    return course.exam;
  };

  //add frequently asked question
  public addFAQ = async (courseId: string, faqData: FrequentlyAskedQuestion): Promise<FrequentlyAskedQuestion[]> => {
    if (isEmpty(faqData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'FAQ data is empty');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course does not exist');

    course.frequentlyAskedQuestions.push(faqData);
    await course.save();
    return course.frequentlyAskedQuestions;
  };

  // get all frequently asked questions
  public async getAllFAQs(courseID: string): Promise<FrequentlyAskedQuestion[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course.frequentlyAskedQuestions;
  }

  // update frequently asked question
  public async updateFAQ(courseID: string, faqID: string, faqData: FrequentlyAskedQuestion): Promise<FrequentlyAskedQuestion[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(faqID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'FAQ Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if faq exists
    const faq = course.frequentlyAskedQuestions.find(faq => faq._id.toString() == faqID);
    if (!faq) throw new HttpException(HttpStatusCodes.CONFLICT, "FAQ doesn't exist");

    faq.question = faqData.question;
    faq.answer = faqData.answer;

    await course.save();
    return course.frequentlyAskedQuestions;
  }

  // delete frequently asked question

  public async deleteFAQ(courseID: string, faqID: string): Promise<FrequentlyAskedQuestion[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(faqID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'FAQ Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // remove faq from course
    course.frequentlyAskedQuestions = course.frequentlyAskedQuestions.filter(faq => faq._id.toString() != faqID);

    await course.save();
    return course.frequentlyAskedQuestions;
  }

  // add course announcement
  public async addAnnouncement(courseID: string, announcementData: Announcement): Promise<Announcement[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    course.announcements.push(announcementData);
    await course.save();
    return course.announcements;
  }

  // get all course announcements
  public async getAllAnnouncements(courseID: string): Promise<Announcement[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course.announcements;
  }

  //update course announcement
  public async updateAnnouncement(courseID: string, announcementID: string, announcementData: Announcement): Promise<Announcement[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(announcementID))
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if announcement exists
    const announcement = course.announcements.find(announcement => announcement._id.toString() == announcementID);
    if (!announcement) throw new HttpException(HttpStatusCodes.CONFLICT, "Announcement doesn't exist");

    announcement.title = announcementData.title;
    announcement.description = announcementData.description;

    await course.save();
    return course.announcements;
  }

  // delete course announcement
  public async deleteAnnouncement(courseID: string, announcementID: string): Promise<Announcement[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(announcementID))
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // remove announcement from course
    course.announcements = course.announcements.filter(announcement => announcement._id.toString() != announcementID);

    await course.save();
    return course.announcements;
  }

  // add discount to a SINGLE course using Course ID
  public async addDiscount(courseID: string, discountData: Discount): Promise<Discount[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (isEmpty(discountData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount data is empty');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    if (discountData.percentage > 100 || discountData.percentage < 0)
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Discount percentage should be between 0 and 100');
    if (discountData.endDate < discountData.startDate)
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'End date should be greater than or equal to start date');

    // check overlapping dates
    const desiredStartDate = new Date(discountData.startDate);
    const desiredEndDate = new Date(discountData.endDate);

    const overlappingDiscount = course.price.discounts.find(discount => {
      return (
        (discount.endDate >= desiredStartDate && discount.endDate <= desiredEndDate) ||
        (discount.startDate >= desiredStartDate && discount.startDate <= desiredEndDate)
      );
    });
    if (overlappingDiscount)
      throw new HttpException(
        HttpStatusCodes.BAD_REQUEST,
        `Discount dates overlap with the following discount dates: ${overlappingDiscount.startDate.toDateString()} - ${overlappingDiscount.endDate.toDateString()}`,
      );

    course.price.discounts.push(discountData);
    await course.save();

    // return all discounts that haven't expired yet and issued by the same user
    const discountsAvailable = course.price.discounts.filter(discount => {
      return discount.endDate >= new Date() && discount.issuedByInstructor == discountData.issuedByInstructor;
    });

    return discountsAvailable;
  }

  // get all course discounts that haven't expired yet
  public async getAllCourseDiscounts(courseID: string, issuedByInstructor: number): Promise<Discount[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const discountsAvailable = course.price.discounts.filter(discount => {
      let query: boolean = discount.endDate >= new Date();
      if (issuedByInstructor != -1) query &&= discount.issuedByInstructor == Boolean(issuedByInstructor);

      return query;
    });

    // to remove expired discounts
    // course.price.discounts= discountsAvailable;
    // await course.save();

    return discountsAvailable;
  }

  //update course discount
  public async updateDiscount(courseID: string, discountID: string, discountData: Discount): Promise<Discount[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(discountID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if discount exists
    const discount = course.price.discounts.find(discount => discount._id.toString() == discountID);
    if (!discount) throw new HttpException(HttpStatusCodes.CONFLICT, "Discount doesn't exist");

    //update discount
    discount.startDate = discountData.startDate;
    discount.endDate = discountData.endDate;
    discount.percentage = discountData.percentage < 0 ? 0 : discountData.percentage > 100 ? 100 : discountData.percentage;

    await course.save();
    return course.price.discounts;
  }

  // delete course discount
  public async deleteDiscount(courseID: string, discountID: string): Promise<Discount[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(discountID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // remove discount from course
    course.price.discounts = course.price.discounts.filter(discount => discount._id.toString() != discountID);

    await course.save();
    return course.price.discounts;
  }

  // get all course sections
  public async getAllCourseSections(courseID: string): Promise<Section[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course.sections;
  }

  // get section by Id controller
  public async getSectionById(courseID: string, sectionID: string): Promise<Section> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const section = course.sections.find(section => section._id.toString() == sectionID);
    if (!section) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    return section;
  }

  // add section to course
  public async addSection(courseID: string, sectionData: Section): Promise<Section[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(sectionData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section data is empty');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    course.sections.push(sectionData);
    await course.save();

    return course.sections;
  }

  // delete section from course
  public async deleteSection(courseID: string, sectionID: string): Promise<Section[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section id is empty');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // remove section from course
    course.sections = course.sections.filter(section => section._id.toString() != sectionID);

    await course.save();
    return course.sections;
  }

  // update course section
  public async updateSection(courseID: string, sectionID: string, sectionData: Section): Promise<Section[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    if (isEmpty(sectionData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section data is empty');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if section exists
    const section = course.sections.find(section => section._id.toString() == sectionID);
    if (!section) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    //update section
    section.title = sectionData.title;
    section.description = sectionData.description;

    await course.save();
    return course.sections;
  }

  // get all section lessons
  public async getAllSectionLessons(courseID: string, sectionID: string): Promise<Lesson[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if section exists
    const section = course.sections.find(section => section._id.toString() == sectionID);
    if (!section) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    return section.lessons;
  }

  // add lesson to section
  public async addLesson(courseID: string, sectionID: string, lessonData: Lesson): Promise<Lesson[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    //check if section exists
    const section = course.sections.find(section => section._id.toString() == sectionID);
    if (!section) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    section.lessons.push(lessonData);
    await course.save();

    return section.lessons;
  }
  // delete lesson from section
  public async deleteLesson(courseID: string, lessonID: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(lessonID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Lesson Id is an invalid Object Id');

    //remove lesson from section
    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course or lesson doesn't exist");

    const { sections } = course;
    let lessonSection;
    //check if lesson exists across all course sections
    for (const section of sections) {
      const courseSection = section.lessons.find(lesson => lesson._id.toString() == lessonID);
      if (courseSection) {
        lessonSection = section;
        break;
      }
    }

    if (!lessonSection) throw new HttpException(HttpStatusCodes.CONFLICT, "Lesson doesn't exist");

    lessonSection.lessons = lessonSection.lessons.filter(lesson => lesson._id.toString() != lessonID);

    await course.save();
  }
  // update lesson in section
  public async updateLesson(courseID: string, lessonID: string, lessonData: Lesson): Promise<Lesson> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(lessonID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Lesson Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let lesson: Lesson;

    //check if lesson exists across all course sections
    for (const section of sections) lesson ||= section.lessons.find(lesson => lesson._id.toString() == lessonID);

    if (!lesson) throw new HttpException(HttpStatusCodes.CONFLICT, "Lesson doesn't exist");

    // update lesson
    lesson.description = lessonData.description ?? lesson.description;
    lesson.title = lessonData.title ?? lesson.title;
    lesson.videoURL = lessonData.videoURL ?? lesson.videoURL;

    await course.save();
    return lesson;
  }
  // get lesson by id
  public async getLessonByIdAndUpdateProgress(courseID: string, lessonID: string, userID: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(lessonID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Lesson Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(userID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let lesson: Lesson;
    //check if lesson exists across all course sections
    for (const section of sections) lesson ||= section.lessons.find(lesson => lesson._id.toString() == lessonID);
    if (!lesson) throw new HttpException(HttpStatusCodes.CONFLICT, "Lesson doesn't exist");

    const traineeService = new TraineeService();
    const updatedProgress = (await traineeService.updateTraineeProgressInCourseIfEnrolled(userID, courseID, lessonID)) ?? 0;
    await traineeService.markLastVisitedCourse(userID, courseID);

    const result: any = {
      _id: lesson._id,
      description: lesson.description,
      title: lesson.title,
      duration: lesson.duration,
      videoURL: lesson.videoURL,
      progress: updatedProgress,
    };

    return result;
  }

  // get exercise by id
  public async getExerciseById(courseID: string, exerciseID: string): Promise<Exercise> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let exercise: Exercise;
    //check if exercise exists across all course sections
    for (const section of sections) exercise ||= section.exercises.find(exercise => exercise._id.toString() == exerciseID);
    if (!exercise) throw new HttpException(HttpStatusCodes.CONFLICT, "Exercise doesn't exist");

    return exercise;
  }

  // add question to exercise
  public async addQuestion(courseID: string, exerciseID: string, questionData: Question): Promise<Question[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let exercise: Exercise;
    //check if exercise exists across all course sections
    for (const section of sections) exercise ||= section.exercises.find(exercise => exercise._id.toString() == exerciseID);
    if (!exercise) throw new HttpException(HttpStatusCodes.CONFLICT, "Exercise doesn't exist");

    // add question
    exercise.questions.push(questionData);

    await course.save();
    return exercise.questions;
  }

  // delete question from exercise
  public async deleteQuestion(courseID: string, exerciseID: string, questionID: string): Promise<Question[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(questionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Question Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;

    let exercise: Exercise;
    //check if exercise exists across all course sections
    for (const section of sections) exercise ||= section.exercises.find(exercise => exercise._id.toString() == exerciseID);
    if (!exercise) throw new HttpException(HttpStatusCodes.CONFLICT, "Exercise doesn't exist");

    // delete question
    exercise.questions = exercise.questions.filter(question => question._id.toString() != questionID);

    await course.save();
    return exercise.questions;
  }

  // add exercise to section
  public async addExercise(courseID: string, sectionID: string, exerciseData: Exercise): Promise<Exercise[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let courseSection: Section;
    //check if section exists across all course sections
    for (const section of sections) courseSection ||= sections.find(section => section._id.toString() == sectionID);
    if (!courseSection) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    // add exercise
    courseSection.exercises.push(exerciseData);

    await course.save();
    return courseSection.exercises;
  }

  // delete exercise from section
  public async deleteExercise(courseID: string, sectionID: string, exerciseID: string): Promise<Exercise[]> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let courseSection: Section;
    //check if section exists across all course sections
    for (const section of sections) courseSection ||= sections.find(section => section._id.toString() == sectionID);
    if (!courseSection) throw new HttpException(HttpStatusCodes.CONFLICT, "Section doesn't exist");

    // delete exercise
    courseSection.exercises = courseSection.exercises.filter(exercise => exercise._id.toString() != exerciseID);

    await course.save();
    return courseSection.exercises;
  }

  // update question
  public async updateQuestion(courseID: string, exerciseID: string, questionID: string, questionData: Question): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(exerciseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(questionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Question Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let exercise: Exercise;
    //check if exercise exists across all course sections
    for (const section of sections) exercise ||= section.exercises.find(exercise => exercise._id.toString() == exerciseID);
    if (!exercise) throw new HttpException(HttpStatusCodes.CONFLICT, "Exercise doesn't exist");

    // find question
    const questionToUpdate = exercise.questions.find(question => question._id.toString() == questionID);
    if (!questionToUpdate) throw new HttpException(HttpStatusCodes.CONFLICT, "Question doesn't exist");

    // update question
    questionToUpdate.question = questionData.question;
    questionToUpdate.answer = questionData.answer;
    questionToUpdate.options = questionData.options;

    await course.save();
  }

  // add discount to serveral courses(with filters)
  public async addDiscountToCourses(filters: CourseFilters, discountData: Discount): Promise<string[]> {
    const filterQuery = generateCoursesFilterQuery(filters);

    const courses = await courseModel.find(filterQuery).select('-rating.reviews');

    const failedCourses: string[] = [];
    for (const course of courses) {
      try {
        await this.addDiscount(course._id.toString(), discountData);
      } catch (err) {
        // if error happened in one course, it will be ignored and the rest will be updated
        failedCourses.push(err.message);
      }
    }
    return failedCourses;
  }

  // add examGrade to course
  public async modifyAverageExamGrade(courseID: string, examGradeInPercent: number): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // compute new average exam grade
    const courseExamGrade = course.examGrades;
    const total = courseExamGrade.totalAttempts;
    const oldAverage = courseExamGrade.average;
    let newAverage = (oldAverage * total + examGradeInPercent) / (total + 1);
    newAverage = Math.round(newAverage * 100) / 100;

    course.examGrades = { average: newAverage, totalAttempts: total + 1 };
    await course.save();
  }
}
export default CourseService;
