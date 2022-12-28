/* eslint-disable react-hooks/rules-of-hooks */
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import useUserInfoQuery from './useUserInfoQuery';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';
import { UseCartStoreSetCart } from '@/store/cartStore';
import { UseWishListSetCart } from '@/store/wishListStore';
import { UseSetUser, UseUserIsAuthenticated } from '@store/userStore';

import { removeInfo } from '@services/savedInfo/SavedInfo';
import LocalStorage from '@/services/localStorage/LocalStorage';
function ProtectedRoutes() {
  const useUserIsAuthenticated = UseUserIsAuthenticated();

  const { isLoading, isError, data, error } = useUserInfoQuery(
    !useUserIsAuthenticated ? true : false
  );

  const useSetUser = UseSetUser();

  const useCartStoreSetCart = UseCartStoreSetCart();
  const useWishListSetCart = UseWishListSetCart();

  if (!isLoading && !isError && data && data.data && data.data.data && LocalStorage.get('role')) {
    const userData = data?.data?.data;

    useSetUser(userData);
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
