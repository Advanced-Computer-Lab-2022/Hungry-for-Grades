import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

function PublicRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}

export default PublicRoutes;
