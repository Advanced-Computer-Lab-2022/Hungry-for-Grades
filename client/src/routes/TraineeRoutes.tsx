import { Navigate, Outlet, useLocation } from 'react-router-dom';

import InstructorDash from '@components/Instructor/InstructorMainSection';

import { UseIsAuthenticated } from '@store/authStore';

import { Role } from '@enums/role.enum';

export default function TraineeRoutes() {
  //const token = UseToken();
  const location = useLocation();
  const useIsAuthenticated = UseIsAuthenticated();

  return 'trainee' === Role.TRAINEE ? (
    <>
      <InstructorDash />
      <Outlet />
    </>
  ) : useIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/signup' />
  );
}