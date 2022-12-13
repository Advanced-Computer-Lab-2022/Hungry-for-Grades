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
import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';

import { removeInfo } from '@services/savedInfo/SavedInfo';
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
    if (userData.country) {
      updateCountry(userData?.country);
    }
    if (
      userData.role.toLocaleLowerCase() === Role.TRAINEE.toLocaleLowerCase()
    ) {
      useCartStoreSetCart((userData as ITrainee)?._cart);
      useWishListSetCart((userData as ITrainee)?._wishlist);
    }
  }

  const location = useLocation();

  if (isLoading && !data && !useUserIsAuthenticated) {
    return <Loader />;
  }

  if (isError || error) {
    removeInfo();
    return <Navigate replace state={{ from: location }} to='/auth/login' />;
  }
  if (useUserIsAuthenticated === null) {
    return <></>;
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
