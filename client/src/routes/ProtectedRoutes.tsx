import { Suspense, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loaderpage/Loader';

import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

import { UseAuthStoreIsAuthenticated } from '@store/authStore';
import useRefreshToken from '@/hooks/useRefreshToken';

/*
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
*/

function PrivateRoutes() {
  const useAuthStoreIsAuthenticated = UseAuthStoreIsAuthenticated();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    // const access = refresh();
  }, [refresh]);

  if (!useAuthStoreIsAuthenticated) {
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
