import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

import { UseIsAuthenticated } from '@store/authStore';

/* function Auth() {
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
} */

function PrivateRoutes() {
  const useIsAuthenticated = UseIsAuthenticated();
  const location = useLocation();

  if (useIsAuthenticated) {
    return <Navigate replace state={{ from: location }} to='/auth/login' />;
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
