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
const LazyUserProfile = lazy(() => import('@/pages/user/profile/Profile'));
/**
 * Trainee Pages
 */
/* const LazyTraineeNoteForm = lazy(
  () => import('@/pages/trainee/note/TraineeNoteForm')
); */
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

/**
 * Instructor Pages
 */
const LazyAddCourse = lazy(() => import('@/pages/course-form/AddCourse'));
const LazyEditCourse = lazy(() => import('@/pages/course-form/EditCourse'));

/**
 * Admin Pages
 */
const LazyAddInstructor = lazy(() => import('@/pages/admin/AddInstructor'));
const LazyAddAdmin = lazy(() => import('@/pages/admin/AddAdmin'));
const LazyAddCorporateTrainee = lazy(
  () => import('@/pages/admin/AddCorporateTrainee')
);
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */

function AllRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<div />} path='/home' />
        <Route element={<LazyUserProfile />} path='/profile/:userId' />
      </Route>

      <Route element={<PublicRoutes />}>
        {/* Trainee Routes*/}
        <Route element={<TraineeRoutes />} path='trainee'>
          <Route path='notes'>
            <Route index element={<LazyTraineeNoteList />} />
            <Route element={<LazyTraineeNoteForm />} path='form' />
          </Route>
          {/*
          <Route path='notes:noteId'>
            <Route index element={<LazyTraineeNote />} />
            <Route element={<LazyTraineeNote />} path='edit' />
          </Route> */}
          <Route element={<LazyTraineeCart />} path='cart' />
          <Route element={<LazyTraineeWishlist />} path='wishlist' />
          <Route element={<LazyTraineeCourses />} path='courses' />
        </Route>

        {/* Instructor Routes*/}
        <Route element={<InstructorRoutes />} path='instructor'>
          <Route element={<LazyAddCourse />} path='add-course' />
          <Route element={<LazyEditCourse />} path='edit-course/:courseid' />
        </Route>
        {/* <Route element={<InstructorRoutes />} path='/instructor'>

        </Route> */}
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
