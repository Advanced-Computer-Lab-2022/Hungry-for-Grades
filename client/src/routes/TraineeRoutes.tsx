import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UseUserIsAuthenticated, UseUser } from '@store/userStore';

import { Role } from '@/enums/role.enum';

export default function TraineeRoutes() {
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const useUser = UseUser();

  return useUser?.role.toLocaleLowerCase() ===
    Role.TRAINEE.toLocaleLowerCase() ? (
    <>
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
