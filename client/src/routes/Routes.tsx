import { lazy, Suspense } from 'react';

//import Home from './pages/home/Home';
/* import Nav from '../nav/Nav'
import Error404 from '../error/Error404'
*/
import { Route, Routes } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import ProtectedRoutes from './ProtectedRoutes';
const LazyHome = lazy(() => import('../pages/home/Home'));
const LazyLogin = lazy(() => import('../pages/login/Login'));
const LazySignup = lazy(() => import('../pages/signup/Signup'));
/*const LazyContact=lazy(()=> import('../contact/Contact'));
const LazySkills=lazy(()=> import('../skills/Skills'));
 */

function AllRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <LazyHome />
            </Suspense>
          }
          path='/home'
        />
      </Route>
      <Route
        element={
          <Suspense fallback={<Loader />}>
            <LazyLogin />
          </Suspense>
        }
        path='/login'
      />
      <Route
        element={
          <Suspense fallback={<Loader />}>
            <LazySignup />
          </Suspense>
        }
        path='/signup'
      />
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
