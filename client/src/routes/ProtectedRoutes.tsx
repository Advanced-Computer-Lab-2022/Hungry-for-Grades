import { Suspense } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Cookie from '../services/cookie/Cookie';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  try {
    const token = Cookie.get('token');
    if (!token) return false;
    // const user = jwt.decode(token);
    //return !!user;
  } catch (e) {
    navigate(location.pathname);
    navigate('/login');

    return false;
  }
}

function PrivateRoutes() {
  if (!Auth()) {
    return <Navigate to='/login' />;
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    );
  }
}

export default PrivateRoutes;
