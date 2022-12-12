import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Role } from '@/enums/role.enum';
import { UseUser, UseUserIsAuthenticated } from '@/store/userStore';

export default function AdminRoutes() {
  //const token = UseToken();
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const useUser = UseUser();

  return useUser?.role.toLocaleLowerCase() ===
    Role.ADMIN.toLocaleLowerCase() ? (
    <>
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
