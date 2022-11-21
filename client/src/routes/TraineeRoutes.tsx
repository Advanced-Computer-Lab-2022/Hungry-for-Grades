import { Navigate, Outlet, useLocation } from 'react-router-dom';

import InstructorDash from '@components/Instructor/InstructorMainSection';

import { UseAuthStoreIsAuthenticated } from '@store/authStore';

import { Role } from '@enums/role.enum';

export default function TraineeRoutes() {
  const location = useLocation();
  const useAuthStoreIsAuthenticated = UseAuthStoreIsAuthenticated();

  return 'trainee' === Role.TRAINEE && useAuthStoreIsAuthenticated ? (
    <>
      <InstructorDash />
      <Outlet />
    </>
  ) : useAuthStoreIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}
