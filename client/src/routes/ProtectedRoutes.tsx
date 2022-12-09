/* eslint-disable react-hooks/rules-of-hooks */
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import useUserInfoQuery from './useUserInfoQuery';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

import { UseUserIsAuthenticated, UseSetUser } from '@store/userStore';
import { UseCartStoreSetCart } from '@/store/cartStore';
import { UseWishListSetCart } from '@/store/wishListStore';
import { UpdateCountry } from '@/store/countryStore';

//let effectOnce = 0;

function ProtectedRoutes() {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const updateCountry = UpdateCountry();

  const { isLoading, isError, data, error } = useUserInfoQuery(
    !useUserIsAuthenticated ? true : false
  );

  const useSetUser = UseSetUser();

  const useCartStoreSetCart = UseCartStoreSetCart();
  const useWishListSetCart = UseWishListSetCart();

  if (
    !isLoading &&
    !isError &&
    data &&
    !useUserIsAuthenticated &&
    data.data &&
    data.data.data
  ) {
    const userData = data?.data?.data;
    useSetUser(userData);
    updateCountry(userData?.country);
    useCartStoreSetCart(userData?._cart);
    useWishListSetCart(userData?._wishList);
  }
  const location = useLocation();

  /*
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
       		if (!access) {
			return <Navigate replace state={{ from: location }} to='/auth/login' />;
		}
      effectOnce = 1;
    }
  }, [refresh]); */

  if (isLoading && !data && !useUserIsAuthenticated) {
    return <Loader />;
  }

  if (useUserIsAuthenticated === null) {
    return <></>;
  }

  if (isError || error) {
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
