import { lazy } from 'react';

//import Home from './pages/home/Home';
/* import Nav from '../nav/Nav'
 */
import { Route, Routes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';

// import InstructorRoutes from './InstructorRoutes';

import AuthRoutes from './AuthRoutes';

import ProtectedRoutes from './ProtectedRoutes';

import PublicRoutes from './PublicRoutes';

import Error from '@/components/error/page/Error';

import StudentPage from '@/pages/studentPage/StudentPage';

//import InstructorPage from '@/pages/InstructorProfile/InstructorPage';

const LazyForgotPassword = lazy(
  () => import('@/pages/forgotPassword/ForgotPassword')
);
const LazyChangePassword = lazy(
  () => import('@/pages/authentication/changePassword/ChangePassword')
);
/**
 * User Pages
 */
const LazyUserProfile = lazy(() => import('@/pages/user/profile/Profile'));
/**
 * Trainee Pages
 */
// const LazyTraineeNoteForm = lazy(
//   () => import('@/pages/trainee/note/TraineeNoteForm')
// );
const LazyTraineeNote = lazy(() => import('@/pages/trainee/note/TraineeNote'));
const LazyTraineeCart = lazy(() => import('@/pages/trainee/cart/TraineeCart'));
const LazyTraineeWishlist = lazy(
  () => import('@/pages/trainee/wishlist/TraineeWishlist')
);
const LazyTraineeCourses = lazy(
  () => import('@/pages/trainee/courses/TraineeCourses')
);

const LazyAddCourse = lazy(() => import('@/pages/course-form/AddCourse'));
const LazyEditCourse = lazy(() => import('@/pages/course-form/EditCourse'));
const LazyInstructorCoursesSection = lazy(
  () => import('@/pages/instructorDashboard/InstructorCoursesSection')
);
const LazyCertificate = lazy(
  () => import('@/pages/certificate/CertificateGenerator')
);

const LazyInstructorDashboard = lazy(
  () => import('@/pages/instructorDashboard/InstructorDashboard')
);
const LazyAddInstructor = lazy(() => import('@/pages/admin/AddInstructor'));
const LazyAddAdmin = lazy(() => import('@/pages/admin/AddAdmin'));
const LazyAddCorporateTrainee = lazy(
  () => import('@/pages/admin/AddCorporateTrainee')
);
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */
// I commented  <Route element={<StudentPage />} path='hussein' /> because it was causing an error

function AllRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<div />} path='/home' />
        <Route element={<LazyUserProfile />} path='/profile/:userId' />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<LazyCourses />} path='courses' />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyCourse />} path='/course' />
        <Route element={<LazyCertificate />} path='/certificate' />

        {/* Instructor Routes*/}
        <Route element={<InstructorRoutes />} path='instructor'>
          <Route element={<LazyAddCourse />} path='add-course' />
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
          <Route element={<LazyInstructorCoursesSection />} path='' />
        </Route>
        {/* <Route element={<InstructorRoutes />} path='/instructor'>
          
        </Route> */}
      </Route>

      <Route element={<AuthRoutes />} path='/auth'>
        <Route element={<LazyLogin />} path='login' />
        <Route element={<LazySignup />} path='signup' />
        <Route element={<LazyForgotPassword />} path='forgot-password' />
        <Route element={<LazyChangePassword />} path='change-password' />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminRoutes />} path='admin'>
          <Route element={<div />} path='home' />
          <Route element={<LazyAddInstructor />} path='add-instructor' />
          <Route element={<LazyAddAdmin />} path='add-admin' />
          <Route
            element={<LazyAddCorporateTrainee />}
            path='add-corporatetrainee'
          />
        </Route>
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<LazyLanding />} path='/' />
        <Route element={<Error type={404} />} path='/*' />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
