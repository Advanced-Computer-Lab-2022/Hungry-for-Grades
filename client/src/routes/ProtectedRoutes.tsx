import { Suspense, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import useUserInfoQuery from './useUserInfoQuery';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

import { UseUserIsAuthenticated } from '@store/userStore';
import useRefreshToken from '@/hooks/useRefreshToken';

let effectOnce = 0;

function ProtectedRoutes() {
  const { isLoading, isError } = useUserInfoQuery();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    if (effectOnce === 0) {
      refresh()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      /* 		if (!access) {
			return <Navigate replace state={{ from: location }} to='/auth/login' />;
		} */
      effectOnce = 1;
    }
  }, [refresh]);

  if (isLoading) {
    return <Loader />;
  }

  if (useUserIsAuthenticated === null) {
    return null;
  }

  if (isError) {
    return <Navigate replace state={{ from: location }} to='/auth/login' />;
  }

  if (useUserIsAuthenticated) {
    return (
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    );
  } else {
    return <Navigate replace state={{ from: location }} to='/auth/login' />;
  }
}

export default ProtectedRoutes;
