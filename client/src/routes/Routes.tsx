import { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';

import InstructorRoutes from './InstructorRoutes';

import AuthRoutes from './AuthRoutes';

import ProtectedRoutes from './ProtectedRoutes';

import PublicRoutes from './PublicRoutes';

import TraineeRoutes from './TraineeRoutes';

import Error from '@/components/error/page/Error';

import { NoteLayout } from '@pages/trainee/note/NoteLayout';

import ErrorMessage from '@/components/error/message/ErrorMessage';

//import InstructorPage from '@/pages/InstructorProfile/InstructorPage';

/**
 * Guest Pages
 */
const LazyLanding = lazy(() => import('@/pages/guest/landing/Landing'));
const LazyCourse = lazy(() => import('@/pages/guest/course/Course'));
const LazySearchCourses = lazy(
  () => import('@/pages/guest/searchCourses/Courses')
);

/**
 * Authentication Pages
 */
const LazySignup = lazy(() => import('@/pages/authentication/signup/Signup'));
const LazyLogin = lazy(() => import('@/pages/authentication/login/Login'));
const LazyForgotPassword = lazy(
  () => import('@/pages/authentication/forgotPassword/ForgotPassword')
);
const LazyChangePassword = lazy(
  () => import('@/pages/authentication/changePassword/ChangePassword')
);
/**
 * User Pages
 */
const LazyUserProfile = lazy(
  () => import('@/pages/trainee/editProfile/Profile')
);
/**
 * Trainee Pages
 */
const LazyTraineeLastStudied = lazy(
  () => import('@/pages/trainee/lastStudiedCourse/LastStudied')
);
const LazyTraineeBoard = lazy(
  () => import('@/pages/trainee/board/TraineeBoard')
);
const LazyTraineeEnrolledCourses = lazy(
  () => import('@/pages/trainee/courses/TraineeCourses')
);
const LazyTraineeDashboard = lazy(
  () => import('@pages/trainee/dashboard/TraineeDashboard')
);
// notes
const LazyTraineeNote = lazy(() => import('@/pages/trainee/note/TraineeNote'));
const LazyTraineeNoteEdit = lazy(
  () => import('@/pages/trainee/note/TraineeNoteEdit')
);
const LazyTraineeNoteForm = lazy(
  () => import('@/pages/trainee/note/TraineeNoteForm')
);
const LazyTraineeNoteList = lazy(
  () => import('@/pages/trainee/note/TraineeNoteList')
);
const LazyTraineeCart = lazy(() => import('@/pages/trainee/cart2/Cart'));
const LazyTraineeWishlist = lazy(
  () => import('@/pages/trainee/wishlist/TraineeWishlist')
);
const LazyTraineeCourses = lazy(
  () => import('@/pages/trainee/courses/TraineeCourses')
);
const LazySolveExam = lazy(() => import('@/pages/trainee/course-view/Exam'));
const LazyTraineeViewCourse = lazy(
  () => import('@/pages/trainee/course-view/TraineeCourseView')
);

const LazyMyReports = lazy(
  () => import('@/pages/trainee/myReports/ReportTable')
);

/**
 * Instructor Pages
 */
const LazyAddCourse = lazy(
  () => import('@/pages/instructor/course-form/AddCourse')
);
const LazyEditCourse = lazy(
  () => import('@/pages/instructor/course-form/EditCourse')
);
const LazyInstructorProfileToShow = lazy(
  () => import('@/pages/InstructorProfile/InstructorPage')
);
const LazyInstructorCoursesSection = lazy(
  () => import('@/pages/instructor/coursesData/InstructorCoursesSection')
);
const LazyTraineeCertificate = lazy(
  () => import('@/pages/trainee/certificate/CertificateGenerator')
);
const LazyAddExam = lazy(() => import('@/pages/instructor/exam-form/AddExam'));
const LazyMyReview = lazy(
  () => import('@/pages/instructor/reviewAndRating/Main')
);
const LazyInstructorEditProfile = lazy(
  () => import('@/pages/instructor/edit-profile/Profile')
);

const LazyInstructorDashboard = lazy(
  () => import('@/pages/instructor/dashboard/InstructorDashboard')
);

const LazyInstructorEarnings = lazy(
  () => import('@/pages/instructor/earnings/InstructorEarningsAnalytics')
);


/**
 * Admin Pages
 */
const LazyAdminHome = lazy(
  () => import('@/pages/admin/home/Home')
);
const LazyAdduser = lazy(() => import('@/pages/admin/createUser/Create'));
const LazyAdminNewsLetter = lazy(() => import('@/pages/admin/newsletter/Newsletter'));
const LazyDiscounts = lazy(
  () => import('@/pages/instructor/setDiscount/courseDiscounts/CourseDiscounts')
);
const LazyAdminDashboard = lazy(
  () => import('@/pages/admin/dashboard/AdminDashboard')
);

const LazyAdminReports = lazy(
  () => import('@/pages/admin/reportRequests/ReportReq')
);
const LazyAdminSendEmail = lazy(
  () => import('@/pages/admin/sendEmail/SendEmail')
);


const LazyAdminCourseRequests = lazy(
  () => import('@/pages/admin/corporateRequests/CourseRequest')
);

const LazyAdminCourseDiscounts = lazy(
  () => import('@/pages/admin/addDiscounts/MakeDiscounts')
);

const LazyAdminRefunds = lazy(() => import('@/pages/admin/refunds/Refund'));

const LazyChat = lazy(() => import('@/pages/trainee/followUps/FollowUp'));
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */
// I commented  <Route element={<StudentPage />} path='hussein' /> because it was causing an error

/**
 * Payment Pages
 */

const LazySuccessfulPayment = lazy(
  () => import('@/pages/payment/PaymentAccepted')
);

const LazyRejectedPayment = lazy(
  () => import('@/pages/payment/PaymentRejected')
);

const LazyFailedPayment = lazy(() => import('@/pages/payment/PaymentFailed'));

// landing page

const roles = ['/trainee/', '/admin/', '/instructor/'];

function AllRoutes() {
  return (

    <Routes>
      {/* Authentication Routes  */}
      <Route element={<AuthRoutes />} path='auth'>
        <Route element={<LazyLogin />} path='login' />
        <Route element={<LazySignup />} path='signup' />
        <Route element={<LazyForgotPassword />} path='forgot-password' />
        <Route
          element={<LazyChangePassword />}
          path='change-password/:userId'
        />

      </Route>
      <Route element={<ProtectedRoutes />}>
        {roles.map((path, index) => (
          <Route
            key={`${index + 311} course`}
            element={<LazySearchCourses />}
            path={`${path}courses`}
          />
        ))}
        {roles.map((path, index) => (
          <Route
            key={`${index + 3} course`}
            element={<LazyCourse />}
            path={`${path}course/:courseid`}
          />
        ))}
        {roles.map((path, index) => (
          <Route
            key={`${index + 33} landing`}
            element={<LazyLanding />}
            path={path}
          />
        ))}
        {roles.map((path, index) => (
          <Route
            key={`${index + 101} instructor`}
            element={<LazyInstructorProfileToShow />}
            path={`${path}instructor/:instructorId`}
          />
        ))}

        {/* Trainee Routes*/}
        <Route element={<TraineeRoutes />} path='trainee'>
          <Route
            element={<LazyTraineeViewCourse />}
            path='view-course/:courseid'
          />
          <Route
            element={<LazyTraineeViewCourse />}
            path='view-course/:courseid/:itemType/:sectionid/:itemid'
          />
          {/* Trainee Dashboard */}
          <Route element={<LazyTraineeDashboard />}>
            <Route
              element={<LazyTraineeEnrolledCourses />}
              path='enrolled-courses'
            />
            <Route element={<LazyChat />} path='followup/:reportId' />
            <Route element={<LazyTraineeLastStudied />} path='dashboard' />
            <Route element={<LazyUserProfile />} path='profile' />

            <Route path='notes'>
              <Route index element={<LazyTraineeNoteList />} />
              <Route element={<LazyTraineeNoteForm />} path='form' />

              <Route element={<NoteLayout />} path=':id'>
                <Route index element={<LazyTraineeNote />} />
                <Route element={<LazyTraineeNoteEdit />} path='edit' />
              </Route>
            </Route>
            <Route element={<LazyMyReports />} path='my-reports' />
            <Route element={<LazyTraineeCart />} path='cart' />
            <Route element={<LazyTraineeWishlist />} path='wishlist' />
            <Route
              element={<LazyTraineeCourses />}
              errorElement={<ErrorMessage />}
              path='courses'
            />
            <Route
              element={<LazyTraineeCertificate />}
              path='certificate/:courseId'
            />
            <Route element={<LazyTraineeBoard />} path='board' />

            <Route element={<LazySolveExam />} path='exam/:courseid/' />
          </Route>
          <Route element={<LazySuccessfulPayment />} path='payment-accepted' />
          <Route element={<LazyFailedPayment />} path='payment-failed' />
          <Route element={<LazyRejectedPayment />} path='payment-rejected' />
        </Route>

        {/* Instructor Routes*/}
        <Route element={<InstructorRoutes />} path='instructor'>
          {/* Instructor Dashboard */}
          <Route element={<LazyInstructorDashboard />}>
            <Route
              index
              element={<LazyInstructorEarnings />}
              path='dashboard'
            />
            <Route element={<LazyChat />} path='followup/:reportId' />
            <Route
              element={<LazyInstructorCoursesSection />}
              path='my-courses'
            />
            <Route element={<LazyMyReview />} path='rating-review' />

            <Route element={<LazyInstructorEditProfile />} path='profile' />
          </Route>
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
          <Route element={<LazyDiscounts />} path='hussein/:title/:courseid' />
          <Route element={<LazyAddCourse />} path='add-course' />
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
          <Route element={<LazyAddExam />} path='create-exam/:courseid' />
          <Route element={<LazyInstructorEditProfile />} path='edit-profile' />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoutes />} path='admin'>
          {/* Admin Dashboard */}
          <Route element={<LazyAdminDashboard />}>
            <Route
              element={
              /*   <iframe
                  allow='fullscreen'
                  height='90%'
                  sandbox='allow-forms allow-modals allow-scripts allow-popups allow-same-origin'
                  src='https://analytics.google.com/analytics/web/#/p346730613/reports/reportinghub?params=_u..nav%3Dmaui'
                  style={{ backgroundColor: 'white' }}
                  title='GA'
                  width='80%'
                /> */
								<div/>
              }
              path='dashboard'
            />
            <Route element={<LazyChat />} path='followup/:reportId' />
            <Route element={<LazyAdduser />} path='create-user' />
            <Route element={<LazyAdminReports />} path='reports' />
            <Route element={<LazyAdminNewsLetter />} path='newsletter' />
            <Route element={<LazyAdminSendEmail />} path='send-email' />
            <Route
              element={<LazyAdminCourseRequests />}
              path='course-requests'
            />
            <Route
              element={<LazyAdminCourseDiscounts />}
              path='courses-discounts'
            />
            <Route element={<LazyAdminRefunds />} path='refunds' />
          </Route>
        </Route>
      </Route>

      {/*Guest Routes */}
      <Route element={<PublicRoutes />}>
        <Route element={<LazySearchCourses />} path='courses' />
        <Route
          element={<LazyInstructorProfileToShow />}
          path='instructor/:instructorId'
        />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyLanding />} path='/' />
        <Route element={<Error type={404} />} path='/*' />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
