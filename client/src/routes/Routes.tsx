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
        <Route element={<LazyCourse />} path='/course' />
        <Route element={<LazyInstructorDashboard />} path='/home/instructor' />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route element={<LazyLogin />} path='/login' />
        <Route element={<LazySignup />} path='/signup' />
      </Route>

      {/*
                <Route path="/projects" element={
                <Suspense fallback={<Loader/>}>
                <LazyProject />
                </Suspense>} />

                <Route path="/achievements" element={
                <Suspense fallback={<Loader/>}>
                <LazyAchievements />
                </Suspense>} />

                <Route path="/contact" element={
                <Suspense fallback={<Loader/>}>
                <LazyContact />
                </Suspense>} /> */}
      {/*          <Route path="/skills" element={
                <Suspense fallback={<Loader/>}>
                <LazySkills />
                </Suspense>} />

                <Route path="/*" element={<Error404 />} /> */}
    </Routes>
  );
}

export default AllRoutes;
