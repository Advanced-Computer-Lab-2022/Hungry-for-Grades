import { Navigate, Outlet, useLocation } from 'react-router-dom';

import AdminDash from '@/pages/admin/AdminDash';
import { Role } from '@/enums/role.enum';
import { UseUserIsAuthenticated } from '@/store/userStore';

export default function AdminRoutes() {
  //const token = UseToken();
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();

  return 'admin' === Role.ADMIN ? (
    <>
      <AdminDash />
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
