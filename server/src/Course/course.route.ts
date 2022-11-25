import CourseController from '@Course/course.controller';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import { CourseDTO } from './course.dto';
import validationMiddleware from '@/Middlewares/validation.middleware';

class CoursesRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:courseId/exam', this.courseController.createExam);
    this.router.get('/:courseId/exam', this.courseController.getCourseExam);
    this.router.get('', this.courseController.getAllCourses);
    this.router.post('/', validationMiddleware(CourseDTO, 'body'), this.courseController.createCourse);

    this.router.get('/category', this.courseController.getAllCategories);
    this.router.get('/price/max', this.courseController.getMaxCoursePrice);
    this.router.post('/rating/:courseId', this.courseController.addReviewToCourse);
    this.router.get('/rating/:courseId', this.courseController.getCourseReviews);
    this.router.get('/instructor/:instructorId', this.courseController.getInstructorCourses);

    //FAQ
    this.router.get('/:courseId/faq', this.courseController.getAllFaqs);
    this.router.post('/:courseId/faq', this.courseController.addFaqToCourse);
    this.router.delete('/:courseId/faq/:faqId', this.courseController.deleteFaq);
    this.router.put('/:courseId/faq/:faqId', this.courseController.updateFaq);

    //Anouncement
    this.router.get('/:courseId/announcement', this.courseController.getAllAnnouncements);
    this.router.post('/:courseId/announcement', this.courseController.addAnnouncementToCourse);
    this.router.delete('/:courseId/announcement/:announcementId', this.courseController.deleteAnnouncement);
    this.router.put('/:courseId/announcement/:announcementId', this.courseController.updateAnnouncement);

    //Discount
    this.router.get('/:courseId/discount', this.courseController.getCourseDiscount);
    this.router.post('/:courseId/discount', this.courseController.addDiscountToCourse);
    this.router.delete('/:courseId/discount/:discountId', this.courseController.deleteDiscount);
    this.router.patch('/:courseId/discount/:discountId', this.courseController.updateDiscount);

    // Section
    this.router.get('/:courseId/section', this.courseController.getAllSections);
    this.router.post('/:courseId/section', this.courseController.addSectionToCourse);
    this.router.delete('/:courseId/section/:sectionId', this.courseController.deleteSection);
    this.router.patch('/:courseId/section/:sectionId', this.courseController.updateSection);

    // Lesson
    this.router.get('/:courseId/section/:sectionId/lesson', this.courseController.getAllLessons);
    this.router.post('/:courseId/section/:sectionId/lesson', this.courseController.addLessonToSection);
    this.router.delete('/:courseId/lesson/:lessonId', this.courseController.deleteLesson);
    this.router.patch('/:courseId/lesson/:lessonId', this.courseController.updateLesson);

    this.router.get('/:id', this.courseController.getCourseById);
    this.router.put('/:id', this.courseController.updateCourse);
    this.router.delete('/:id', this.courseController.deleteCourse);
  }
}

export default CoursesRoute;
