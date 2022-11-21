import { Navigate, Outlet, useLocation } from 'react-router-dom';

import AdminDash from '@/pages/admin/AdminDash';
import { Role } from '@/enums/role.enum';
import { UseAuthStoreIsAuthenticated } from '@/store/authStore';

export default function AdminRoutes() {
  //const token = UseToken();
  const location = useLocation();
  const useAuthStoreIsAuthenticated = UseAuthStoreIsAuthenticated();

  return 'admin' === Role.ADMIN ? (
    <>
      <AdminDash />
      <Outlet />
    </>
  ) : useAuthStoreIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
