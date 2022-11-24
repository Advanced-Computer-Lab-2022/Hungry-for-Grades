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
  () => import('@/pages/changePassword/ChangePassword')
);

const LazyAddCourse = lazy(() => import('@/pages/course-form/AddCourse'));
const LazyEditCourse = lazy(() => import('@/pages/course-form/EditCourse'));
const LazyLanding = lazy(() => import('@/pages/landing/Landing'));
const LazyCourse = lazy(() => import('@/pages/course/Course'));
const LazyCourses = lazy(() => import('@/pages/courses/Courses'));
const LazyLogin = lazy(() => import('@/pages/login/Login'));
const LazySignup = lazy(() => import('@/pages/signup/Signup'));
const LazyUserProfile = lazy(() => import('@/pages/user/profile/Profile'));

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
        <Route element={<StudentPage />} path='hussein' />

        <Route
          element={<LazyInstructorDashboard />}
          path='/home/instructor/:instructorid'
        />
        <Route element={<LazyInstructorDashboard />} path='/instructor' />
        <Route element={<LazyAddCourse />} path='/instructor/add-course' />
        <Route
          element={<LazyEditCourse />}
          path='/instructor/edit-course/:courseid'
        />
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
