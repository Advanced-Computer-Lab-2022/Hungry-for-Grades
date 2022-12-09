import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import LocalStorage from '@/services/localStorage/LocalStorage';
import { Role } from '@/enums/role.enum';

function PublicRoutes() {
  const role = LocalStorage.get('role') as Role | null;
  if (role) {
    return <Navigate to={`${role}/dashboard`} />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
}

export default PublicRoutes;
