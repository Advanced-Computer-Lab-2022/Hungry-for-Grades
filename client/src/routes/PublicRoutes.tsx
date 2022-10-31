import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

function PublicRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
}

export default PublicRoutes;
