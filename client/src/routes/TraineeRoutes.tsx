import { Navigate, Outlet, useLocation } from 'react-router-dom';

import TraineeDashboard from '@pages/trainee/dashboard/TraineeDashboard';

import { UseUserIsAuthenticated } from '@store/userStore';

import { Role } from '@enums/role.enum';

export default function TraineeRoutes() {
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();

  return 'trainee' === Role.TRAINEE ? (
    <>
      <TraineeDashboard />
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
