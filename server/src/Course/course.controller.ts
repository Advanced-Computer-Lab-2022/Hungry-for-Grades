import { Rating, Review } from '@/Common/Types/common.types';
import { HttpResponse } from '@/Utils/HttpResponse';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { PaginatedData, PaginatedResponse } from '@/Utils/PaginationResponse';
import courseService from '@Course/course.dao';
import { Announcement, Discount, FrequentlyAskedQuestion, ICourse, Lesson, Question, Section } from '@Course/course.interface';
import { Category, CourseFilters, CourseFiltersDefault } from '@Course/course.types';
import { NextFunction, Request, Response } from 'express';
import { addDefaultValuesToCourseFilters } from '@Course/course.common';
import { ITeachedCourse } from '@/Instructor/instructor.interface';
import { CategoryDTO, CourseDTO } from './course.dto';

class CourseController {
  public courseService = new courseService();

  public getAllCourses = async (req: Request<{}, {}, {}, CourseFilters>, res: Response<PaginatedResponse<ICourse>>, next: NextFunction) => {
    try {
      const requestFilters: CourseFilters = req.query;
      const newFilters = await addDefaultValuesToCourseFilters(requestFilters);

      const coursesPaginatedResponse: PaginatedData<ICourse> = await this.courseService.getAllCourses(newFilters);

      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  // get max course price
  public getMaxCoursePrice = async (req: Request, res: Response<HttpResponse<number>>, next: NextFunction) => {
    try {
      const maxPrice = await this.courseService.getMaxPrice((req.query.country as string) ?? 'US');
      res.json({ data: maxPrice, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getInstructorCourses = async (
    req: Request<{ instructorId: string }, {}, {}, CourseFilters>,
    res: Response<PaginatedResponse<ITeachedCourse>>,
    next: NextFunction,
  ) => {
    try {
      const requestFilters: CourseFilters = req.query;
      const newFilters = await addDefaultValuesToCourseFilters(requestFilters);

      const coursesPaginatedResponse: PaginatedData<ITeachedCourse> = await this.courseService.getCoursesTaughtByInstructor(
        req.params.instructorId,
        newFilters,
      );

      res.json({ ...coursesPaginatedResponse, message: 'Completed Successfully', success: true });
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const country: string = (req.query.country as string) ?? 'US';
      const courseData: ICourse = await this.courseService.getCourseById(courseId, country);

      res.json({
        data: courseData,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public createCourse = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction) => {
    try {
      const courseData: CourseDTO = req.body;
      const country = (req.query.country as string) ?? 'US';
      const createdCourse: ICourse = await this.courseService.createCourse(courseData, country);

      res.status(201).json({
        data: createdCourse,
        message: 'Course Created Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const courseData: ICourse = req.body;
      const updatedCourse: ICourse = await this.courseService.updateCourse(courseId, courseData);

      res.json({
        data: updatedCourse,
        message: 'Course Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteCourse = async (req: Request, res: Response<HttpResponse<ICourse>>, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: ICourse = await this.courseService.deleteCourse(userId);

      res.status(HttpStatusCodes.ACCEPTED).json({
        data: deleteUserData,
        message: 'Course Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllCategories = async (req: Request, res: Response<HttpResponse<CategoryDTO[]>>, next: NextFunction) => {
    try {
      const categoryList = await this.courseService.getAllCategories();
      res.json({
        data: categoryList,
        message: 'Completed Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //add review to course controller
  public addReviewToCourse = async (req: Request, res: Response<HttpResponse<Rating>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const userReview: Review = req.body;

      const courseRating: Rating = await this.courseService.addReviewToCourse(courseId, userReview);

      res.json({
        data: courseRating,
        message: 'Review Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getCourseReviews = async (req: Request, res: Response<PaginatedResponse<Review>>, next: NextFunction) => {
    try {
      const courseId: string = req.params.courseId as string;
      let page = 1;
      let pageLimit = 5;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.limit) pageLimit = parseInt(req.query.limit as string);

      const courseReviewsPaginatedResponse: PaginatedData<Review> = await this.courseService.getCourseReviews(courseId, page, pageLimit);

      res.json({
        ...courseReviewsPaginatedResponse,
        message: 'Review Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //create exam controller
  public createExam = async (req: Request, res: Response<HttpResponse<Question[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const examData: Question[] = req.body;

      const createdExam = await this.courseService.createExam(courseId, examData);

      res.json({
        data: createdExam,
        message: 'Exam Created Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get exam controller
  public getCourseExam = async (req: Request, res: Response<HttpResponse<Question[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const exam = await this.courseService.getCourseExam(courseId);

      res.json({
        data: exam,
        message: 'Exam Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // add faq controller
  public addFaqToCourse = async (req: Request, res: Response<HttpResponse<FrequentlyAskedQuestion[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const faqData: FrequentlyAskedQuestion = req.body;

      const updatedCourse = await this.courseService.addFAQ(courseId, faqData);

      res.json({
        data: updatedCourse,
        message: 'Faq Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all faqs controller
  public getAllFaqs = async (req: Request, res: Response<HttpResponse<FrequentlyAskedQuestion[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const faqs = await this.courseService.getAllFAQs(courseId);

      res.json({
        data: faqs,
        message: 'Faq Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // update faq controller
  public updateFaq = async (req: Request, res: Response<HttpResponse<FrequentlyAskedQuestion[]>>, next: NextFunction) => {
    try {
      const { courseId, faqId } = req.params;
      const faqData: FrequentlyAskedQuestion = req.body;

      const updatedCourse = await this.courseService.updateFAQ(courseId, faqId, faqData);

      res.json({
        data: updatedCourse,
        message: 'Faq Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // delete faq controller
  public deleteFaq = async (req: Request, res: Response<HttpResponse<FrequentlyAskedQuestion[]>>, next: NextFunction) => {
    try {
      const { courseId, faqId } = req.params;

      const updatedCourse = await this.courseService.deleteFAQ(courseId, faqId);

      res.json({
        data: updatedCourse,
        message: 'Faq Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // add announcement controller
  public addAnnouncementToCourse = async (req: Request, res: Response<HttpResponse<Announcement[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const announcementData: Announcement = req.body;

      const updatedCourse = await this.courseService.addAnnouncement(courseId, announcementData);

      res.json({
        data: updatedCourse,
        message: 'Announcement Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all announcements controller
  public getAllAnnouncements = async (req: Request, res: Response<HttpResponse<Announcement[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const announcements = await this.courseService.getAllAnnouncements(courseId);

      res.json({
        data: announcements,
        message: 'Announcements Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // update announcement controller
  public updateAnnouncement = async (req: Request, res: Response<HttpResponse<Announcement[]>>, next: NextFunction) => {
    try {
      const { courseId, announcementId } = req.params;
      const announcementData: Announcement = req.body;

      const updatedCourse = await this.courseService.updateAnnouncement(courseId, announcementId, announcementData);

      res.json({
        data: updatedCourse,
        message: 'Announcement Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // delete announcement controller
  public deleteAnnouncement = async (req: Request, res: Response<HttpResponse<Announcement[]>>, next: NextFunction) => {
    try {
      const { courseId, announcementId } = req.params;

      const updatedCourse = await this.courseService.deleteAnnouncement(courseId, announcementId);

      res.json({
        data: updatedCourse,
        message: 'Announcement Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  //add discount to course controller
  public addDiscountToCourse = async (req: Request, res: Response<HttpResponse<Discount[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const discountData: Discount = req.body;

      const updatedCourse = await this.courseService.addDiscount(courseId, discountData);

      res.json({
        data: updatedCourse,
        message: 'Discount Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all discounts controller
  public getCourseDiscount = async (req: Request, res: Response<HttpResponse<Discount[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const discounts = await this.courseService.getCourseDiscount(courseId);

      res.json({
        data: discounts,
        message: 'Discounts Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // update discount controller
  public updateDiscount = async (req: Request, res: Response<HttpResponse<Discount[]>>, next: NextFunction) => {
    try {
      const { courseId, discountId } = req.params;
      const discountData: Discount = req.body;

      const updatedCourse = await this.courseService.updateDiscount(courseId, discountId, discountData);

      res.json({
        data: updatedCourse,
        message: 'Discount Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // delete discount controller
  public deleteDiscount = async (req: Request, res: Response<HttpResponse<Discount[]>>, next: NextFunction) => {
    try {
      const { courseId, discountId } = req.params;

      const updatedCourse = await this.courseService.deleteDiscount(courseId, discountId);

      res.json({
        data: updatedCourse,
        message: 'Discount Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all sections controller
  public getAllSections = async (req: Request, res: Response<HttpResponse<Section[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      const sections = await this.courseService.getAllCourseSections(courseId);

      res.json({
        data: sections,
        message: 'Sections Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // add section controller
  public addSectionToCourse = async (req: Request, res: Response<HttpResponse<Section[]>>, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const sectionData: Section = req.body;

      const updatedCourse = await this.courseService.addSection(courseId, sectionData);

      res.json({
        data: updatedCourse,
        message: 'Section Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // delete section controller
  public deleteSection = async (req: Request, res: Response<HttpResponse<Section[]>>, next: NextFunction) => {
    try {
      const { courseId, sectionId } = req.params;

      const updatedCourse = await this.courseService.deleteSection(courseId, sectionId);

      res.json({
        data: updatedCourse,
        message: 'Section Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // update section controller
  public updateSection = async (req: Request, res: Response<HttpResponse<Section[]>>, next: NextFunction) => {
    try {
      const { courseId, sectionId } = req.params;
      const sectionData: Section = req.body;

      const updatedCourse = await this.courseService.updateSection(courseId, sectionId, sectionData);

      res.json({
        data: updatedCourse,
        message: 'Section Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get all lessons controller
  public getAllLessons = async (req: Request, res: Response<HttpResponse<Lesson[]>>, next: NextFunction) => {
    try {
      const { courseId, sectionId } = req.params;

      const lessons = await this.courseService.getAllSectionLessons(courseId, sectionId);

      res.json({
        data: lessons,
        message: 'Lessons Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // add lesson controller
  public addLessonToSection = async (req: Request, res: Response<HttpResponse<Lesson[]>>, next: NextFunction) => {
    try {
      const { courseId, sectionId } = req.params;
      const lessonData: Lesson = req.body;

      const updatedCourse = await this.courseService.addLesson(courseId, sectionId, lessonData);

      res.json({
        data: updatedCourse,
        message: 'Lesson Added Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  // delete lesson controller
  public deleteLesson = async (req: Request, res: Response<HttpResponse<object>>, next: NextFunction) => {
    try {
      const { courseId, lessonId } = req.params;

      await this.courseService.deleteLesson(courseId, lessonId);

      res.json({
        data: null,
        message: 'Lesson Deleted Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // update lesson controller
  public updateLesson = async (req: Request, res: Response<HttpResponse<Lesson>>, next: NextFunction) => {
    try {
      const { courseId, lessonId } = req.params;
      const lessonData: Lesson = req.body;

      const updatedCourse = await this.courseService.updateLesson(courseId, lessonId, lessonData);

      res.json({
        data: updatedCourse,
        message: 'Lesson Updated Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  // get lesson by id controller
  public getLessonById = async (req: Request, res: Response<HttpResponse<Lesson>>, next: NextFunction) => {
    try {
      const { userId, courseId, lessonId } = req.params;

      const lesson = await this.courseService.getLessonByIdAndUpdateProgress(courseId, lessonId, userId);

      res.json({
        data: lesson,
        message: 'Lesson Fetched Successfully',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default CourseController;
