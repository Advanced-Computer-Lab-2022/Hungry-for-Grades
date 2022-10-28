import { lazy } from 'react';

//import Home from './pages/home/Home';
/* import Nav from '../nav/Nav'
import Error404 from '../error/Error404'
*/
import { Route, Routes } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';

import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
const LazyLanding = lazy(() => import('../pages/landing/Landing'));
const LazyCourse = lazy(() => import('../pages/course/Course'));
const LazyCourses = lazy(() => import('../pages/courses/Courses'));
const LazyLogin = lazy(() => import('../pages/login/Login'));
const LazySignup = lazy(() => import('../pages/signup/Signup'));
const LazyInstructorDashboard = lazy(
  () => import('../pages/instructorDashboard/InstructorDashboard')
);
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */

function AllRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<div />} path='/home' />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<LazyLanding />} path='/' />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route element={<LazyCourses />} path='courses' />
        <Route element={<LazyCourse />} path='course/:courseid' />
        <Route element={<LazyCourse />} path='/course' />
        <Route element={<LazyInstructorDashboard />} path='/home/instructor' />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route element={<LazyLogin />} path='/auth/login' />
        <Route element={<LazySignup />} path='/auth/signup' />
      </Route>

      {/*  <Route element={<Error404 />} path="/*" /> */}
    </Routes>
  );
}

export default AllRoutes;
