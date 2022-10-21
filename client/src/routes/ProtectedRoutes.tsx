import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Cookie from '../services/cookie/Cookie';

function Auth() {
  try {
    Cookie.get('auth');
    return true;
  } catch (e) {
    return false;
  }
}

function PrivateRoutes() {
  if (!Auth()) {
    return <Navigate to='/login' />;
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    );
  }
}

export default PrivateRoutes;
