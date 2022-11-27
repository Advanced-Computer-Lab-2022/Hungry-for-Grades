import { Rating, Review } from '@/Common/Types/common.types';
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
  getYoutubeVideoID,
} from '@Course/course.common';
import instructorModel from '@/Instructor/instructor.model';
import userModel from '@/User/user.schema';
import { CategoryDTO, CourseDTO, FrequentlyAskedQuestionDTO } from './course.dto';
import { IInstructor, ITeachedCourse } from '@/Instructor/instructor.interface';
import categories from '@Course/category.json';
import traineeModel from '@/Trainee/trainee.model';
import { ITrainee } from '@/Trainee/trainee.interface';
import TraineeService from '@/Trainee/trainee.dao';

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
    if (isEmpty(instructorId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor Id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course.frequentlyAskedQuestions;
  }

  // update frequently asked question
  public async updateFAQ(courseID: string, faqID: string, faqData: FrequentlyAskedQuestion): Promise<FrequentlyAskedQuestion[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(faqID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'FAQ id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(faqID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'FAQ id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(announcementData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement data is empty');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    course.announcements.push(announcementData);
    await course.save();
    return course.announcements;
  }

  // get all course announcements
  public async getAllAnnouncements(courseID: string): Promise<Announcement[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    return course.announcements;
  }

  //update course announcement
  public async updateAnnouncement(courseID: string, announcementID: string, announcementData: Announcement): Promise<Announcement[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(announcementID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(announcementID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement id is empty');
    if (!mongoose.Types.ObjectId.isValid(announcementID))
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Announcement Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    // remove announcement from course
    course.announcements = course.announcements.filter(announcement => announcement._id.toString() != announcementID);

    await course.save();
    return course.announcements;
  }

  // add discount to course
  public async addDiscount(courseID: string, discountData: Discount): Promise<Discount[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(discountData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount data is empty');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    discountData.percentage = discountData.percentage < 0 ? 0 : discountData.percentage > 100 ? 100 : discountData.percentage;
    course.price.discounts.push(discountData);
    await course.save();

    return course.price.discounts;
  }

  // get all course discounts
  public async getCourseDiscount(courseID: string): Promise<Discount[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const discountAvailable = course.price.discounts.filter(discount => {
      return Date.now() >= discount.startDate.getTime() && Date.now() <= discount.endDate.getTime();
    });

    return discountAvailable;
  }

  //update course discount
  public async updateDiscount(courseID: string, discountID: string, discountData: Discount): Promise<Discount[]> {
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(discountID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(discountID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Discount id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
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
    if (isEmpty(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    if (isEmpty(sectionID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Section id is empty');
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
  public async getLessonByIdAndUpdateProgress(courseID: string, lessonID: string, userID: string): Promise<Lesson> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(lessonID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Lesson Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(userID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Lesson Id is an invalid Object Id');

    const course = await courseModel.findById(courseID);
    if (!course) throw new HttpException(HttpStatusCodes.CONFLICT, "Course doesn't exist");

    const { sections } = course;
    let lesson: Lesson;
    //check if lesson exists across all course sections
    for (const section of sections) lesson ||= section.lessons.find(lesson => lesson._id.toString() == lessonID);
    if (!lesson) throw new HttpException(HttpStatusCodes.CONFLICT, "Lesson doesn't exist");

    const traineeService = new TraineeService();
    await traineeService.updateTraineeProgressInCourseIfEnrolled(userID, courseID, lessonID);
    await traineeService.markLastVisitedCourse(userID, courseID);

    return lesson;
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
}
export default CourseService;
