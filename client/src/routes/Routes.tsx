import { lazy } from 'react';

//import Home from './pages/home/Home';
/* import Nav from '../nav/Nav'
 */

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

import AdminHome from '@/pages/admin/home/AdminHome';

//import InstructorPage from '@/pages/InstructorProfile/InstructorPage';

/**
 * Guest Pages
 */
const LazyLanding = lazy(() => import('@/pages/guest/landing/Landing'));
const LazyCourse = lazy(() => import('@/pages/course/Course'));
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
const LazyTraineeEnrolledCourses = lazy(
  () => import('@/pages/trainee/courses/TraineeCourses')
);
const LazyTraineeDashboard = lazy(
  () => import('@pages/trainee/dashboard/TraineeDashboard')
);
const LazyTraineeChangePassword = lazy(
  () => import('@/pages/trainee/editProfile/change-password/ChangePassword')
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
const LazyTraineeCart = lazy(() => import('@/pages/trainee/cart/TraineeCart'));
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
/**
 * Instructor Pages
 */
const LazyAddCourse = lazy(() => import('@/pages/course-form/AddCourse'));
const LazyEditCourse = lazy(() => import('@/pages/course-form/EditCourse'));
const LazyInstructorProfileToShow = lazy(
  () => import('@/pages/InstructorProfile/InstructorPage')
);
const LazyInstructorCoursesSection = lazy(
  () => import('@/pages/instructorDashboard/InstructorCoursesSection')
);
const LazyTraineeCertificate = lazy(
  () => import('@/pages/trainee/certificate/CertificateGenerator')
);
const LazyAddExam = lazy(() => import('@/pages/course-form/AddExam'));
const LazyMyReview = lazy(
  () => import('@pages/instructorDashboard/reviewAndRating/Main')
);
const LazyInstructorEditProfile = lazy(
  () => import('@/pages/InstructorProfile/edit-profile/Profile')
);
const LazyInstructorChangePassword = lazy(
  () =>
    import(
      '@/pages/InstructorProfile/edit-profile/change-password/ChangePassword'
    )
);
/**
 * Admin Pages
 */
const LazyAddInstructor = lazy(() => import('@/pages/admin/AddInstructor'));
const LazyAddAdmin = lazy(() => import('@/pages/admin/AddAdmin'));
const LazyAddCorporateTrainee = lazy(
  () => import('@/pages/admin/AddCorporateTrainee')
);
const LazyDiscounts = lazy(
  () =>
    import(
      '@pages/instructorDashboard/setDiscount/courseDiscounts/CourseDiscounts'
    )
);
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */
// I commented  <Route element={<StudentPage />} path='hussein' /> because it was causing an error

function AllRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<LazySearchCourses />} path='courses' />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyLanding />} path='/' />
        {/* Trainee Routes*/}
        <Route
          element={<LazyInstructorProfileToShow />}
          path='instructor/:instructorId'
        />
        <Route element={<TraineeRoutes />} path='trainee'>
          <Route
            element={<LazyTraineeViewCourse />}
            path='view-course/:courseid'
          />
          <Route
            element={<LazyTraineeViewCourse />}
            path='view-course/:courseid/:itemType/:sectionNumber/:itemNumber'
          />
          <Route element={<LazyTraineeDashboard />}>
            <Route
              element={<LazyTraineeEnrolledCourses />}
              path='enrolled-courses'
            />
            <Route element={<LazyTraineeLastStudied />} path='dashboard' />
            <Route element={<LazyUserProfile />} path='profile' />
            <Route
              element={<LazyTraineeChangePassword />}
              path='change-password'
            />

            <Route path='notes'>
              <Route index element={<LazyTraineeNoteList />} />
              <Route element={<LazyTraineeNoteForm />} path='form' />

              <Route element={<NoteLayout />} path=':id'>
                <Route index element={<LazyTraineeNote />} />
                <Route element={<LazyTraineeNoteEdit />} path='edit' />
              </Route>
            </Route>
            <Route element={<LazyTraineeCart />} path='cart' />
            <Route element={<LazyTraineeWishlist />} path='wishlist' />
            <Route
              element={<LazyTraineeCourses />}
              errorElement={<ErrorMessage />}
              path='courses'
            />
            <Route element={<LazyTraineeCertificate />} path='certificate' />

            <Route element={<LazySolveExam />} path='exam/:courseid/' />
          </Route>
        </Route>

        {/* Instructor Routes*/}
        <Route element={<InstructorRoutes />} path='instructor'>
        <Route element={<AdminHome />} path = 'test' />
          <Route element={<LazyAddCourse />} path='add-course' />
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
          <Route element={<LazyDiscounts />} path='hussein/:title/:courseid' />
          <Route element={<LazyAddCourse />} path='add-course' />
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
          <Route element={<LazyAddExam />} path='create-exam/:courseid' />
          <Route element={<LazyInstructorCoursesSection />} path='' />
          <Route element={<LazyMyReview />} path='rating-review' />
          <Route element={<LazyInstructorEditProfile />} path='edit-profile' />
          <Route
            element={<LazyInstructorChangePassword />}
            path='change-password'
          />
        </Route>
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyCourse />} path='/course' />
      </Route>

      {/* Authorized Routes */}
      <Route element={<ProtectedRoutes />}>
        {/* Admin Routes */}
        <Route element={<AdminRoutes />} path='admin'>
          <Route element={<div />} path='home' />
          <Route element={<LazyAddInstructor />} path='add-instructor' />
          <Route element={<LazyAddAdmin />} path='add-admin' />
          <Route
            element={<LazyAddCorporateTrainee />}
            path='add-corporatetrainee'
          />
          <Route element={<LazyUserProfile />} path='profile' />
        </Route>
      </Route>

      {/* Authentication Routes  */}
      <Route element={<AuthRoutes />} path='/auth'>
        <Route element={<LazyLogin />} path='login' />
        <Route element={<LazySignup />} path='signup' />
        <Route element={<LazyForgotPassword />} path='forgot-password' />
        <Route
          element={<LazyChangePassword />}
          path='change-password/:userId'
        />
      </Route>
      {/*Guest Routes */}
      <Route element={<PublicRoutes />}>
        <Route element={<LazySearchCourses />} path='courses' />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyLanding />} path='/' />
        <Route element={<Error type={404} />} path='/*' />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
