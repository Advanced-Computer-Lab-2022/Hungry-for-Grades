import { lazy } from 'react';

//import Home from './pages/home/Home';
/* import Nav from '../nav/Nav'
import Error404 from '../error/Error404'
*/
import { Route, Routes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';

import InstructorRoutes from './InstructorRoutes';

import AuthRoutes from './AuthRoutes';

import ProtectedRoutes from './ProtectedRoutes';

import PublicRoutes from './PublicRoutes';

import InstructorPage from '@pages/InstructorProfile/InstructorPage';

const LazyAddCourse = lazy(() => import('@/pages/new-course/CourseForm'));
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

      <Route
        element={<InstructorPage text={'637962792c3f71696ca3473c'} />}
        path='hussein'
      />

      <Route element={<PublicRoutes />}>
        <Route element={<LazyLanding />} path='/' />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<LazyCourses />} path='courses' />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyCourse />} path='/course' />
        <Route
          element={<LazyInstructorDashboard />}
          path='/home/instructor/:instructorid'
        />
        <Route element={<AdminRoutes />} path='/admin'>
          <Route element={<LazyAddInstructor />} path='addinstructor' />
          <Route element={<LazyAddAdmin />} path='addadmin' />
          <Route
            element={<LazyAddCorporateTrainee />}
            path='addcorporatetrainee'
          />
        </Route>

        <Route element={<InstructorRoutes />} path='/instructor'>
          <Route element={<LazyInstructorDashboard />} path='' />
          <Route element={<LazyAddCourse />} path='add-course' />
        </Route>
      </Route>

      <Route element={<AuthRoutes />} path='/auth'>
        <Route element={<LazyLogin />} path='login' />
        <Route element={<LazySignup />} path='signup' />
      </Route>

      {/*  <Route element={<Error404 />} path="/*" /> */}
    </Routes>
  );
}

export default AllRoutes;
