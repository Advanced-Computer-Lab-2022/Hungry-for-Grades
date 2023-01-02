import CourseController from '@Course/course.controller';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import { CourseDTO } from './course.dto';
import validationMiddleware from '@/Middlewares/validation.middleware';
import { allowedRoles, authenticateUser } from '@/Middlewares/auth.middleware';
import { AuthRole } from '@/Authentication/auth.interface';

class CoursesRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:courseId/exam', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.createExam);
    this.router.get(
      '/:courseId/exam',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getCourseExam,
    );
    this.router.get('', this.courseController.getAllCourses); // guest
    this.router.post(
      '/',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      validationMiddleware(CourseDTO, 'body'),
      this.courseController.createCourse,
    );

    this.router.get('/category', this.courseController.getAllCategories); // guest
    this.router.post(
      '/discount',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]),
      this.courseController.addDiscountToCoursesWithFilters,
    );
    this.router.get('/price/max', this.courseController.getMaxCoursePrice); // guest
    this.router.post(
      '/rating/:courseId/trainee/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.courseController.addReviewToCourse,
    );
    this.router.get('/rating/:courseId', this.courseController.getCourseReviews); // guest
    this.router.get(
      '/rating/:courseId/trainee/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.courseController.getUserReview,
    );
    this.router.delete(
      '/rating/:courseId/trainee/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.courseController.deleteUserReview,
    );
    this.router.patch(
      '/rating/:courseId/trainee/:traineeId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE]),
      this.courseController.updateUserReview,
    );
    this.router.get('/instructor/:instructorId', this.courseController.getInstructorCourses); // guest

    //FAQ
    this.router.get('/:courseId/faq', this.courseController.getAllFaqs); // guest
    this.router.post('/:courseId/faq', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.addFaqToCourse);
    this.router.delete('/:courseId/faq/:faqId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.deleteFaq);
    this.router.put('/:courseId/faq/:faqId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.updateFaq);

    //Anouncement
    this.router.get(
      '/:courseId/announcement',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getAllAnnouncements,
    );
    this.router.post('/:courseId/announcement', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.addAnnouncementToCourse);
    this.router.delete(
      '/:courseId/announcement/:announcementId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.deleteAnnouncement,
    );
    this.router.put(
      '/:courseId/announcement/:announcementId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.updateAnnouncement,
    );

    //Discount
    this.router.get('/:courseId/discount', this.courseController.getCourseDiscount); // guest
    this.router.post(
      '/:courseId/discount',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]),
      this.courseController.addDiscountToCourse,
    );
    this.router.delete(
      '/:courseId/discount/:discountId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]),
      this.courseController.deleteDiscount,
    );
    this.router.patch(
      '/:courseId/discount/:discountId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR, AuthRole.ADMIN]),
      this.courseController.updateDiscount,
    );

    // Section
    this.router.get(
      '/:courseId/section',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getAllSections,
    );
    this.router.post('/:courseId/section', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.addSectionToCourse);
    this.router.get(
      '/:courseId/section/:sectionId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getSectionById,
    );
    this.router.delete('/:courseId/section/:sectionId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.deleteSection);
    this.router.patch('/:courseId/section/:sectionId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.updateSection);

    // Lesson
    this.router.get(
      '/:courseId/lesson/:lessonId/user/:userId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getLessonById,
    );
    this.router.get(
      '/:courseId/section/:sectionId/lesson',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getAllLessons,
    );
    this.router.post(
      '/:courseId/section/:sectionId/lesson',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.addLessonToSection,
    );
    this.router.delete('/:courseId/lesson/:lessonId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.deleteLesson);
    this.router.patch('/:courseId/lesson/:lessonId', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.updateLesson);

    // Exercise
    this.router.get(
      '/:courseId/exercise/:exerciseId',
      authenticateUser,
      allowedRoles([AuthRole.INDIVIDUAL_TRAINEE, AuthRole.CORPORATE_TRAINEE, AuthRole.INSTRUCTOR]),
      this.courseController.getExerciseById,
    );
    this.router.post(
      '/:courseId/exercise/:exerciseId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.addQuestionToExercise,
    );
    this.router.put(
      '/:courseId/exercise/:exerciseId/question/:questionId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.updateQuestion,
    );
    this.router.delete(
      '/:courseId/exercise/:exerciseId/question/:questionId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.deleteQuestion,
    );
    this.router.post(
      '/:courseId/section/:sectionId/exercise',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.addExerciseToSection,
    );
    this.router.delete(
      '/:courseId/section/:sectionId/exercise/:exerciseId',
      authenticateUser,
      allowedRoles([AuthRole.INSTRUCTOR]),
      this.courseController.deleteExercise,
    );

    this.router.get('/:id', this.courseController.getCourseById); // guest
    this.router.put('/:id', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.updateCourse);
    this.router.delete('/:id', authenticateUser, allowedRoles([AuthRole.INSTRUCTOR]), this.courseController.deleteCourse);
  }
}

export default CoursesRoute;
