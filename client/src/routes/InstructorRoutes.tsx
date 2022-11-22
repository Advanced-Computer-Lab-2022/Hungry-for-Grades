import { Navigate, Outlet, useLocation } from 'react-router-dom';

import InstructorDash from '@components/Instructor/InstructorMainSection';

import { UseUserIsAuthenticated } from '@store/userStore';

import { Role } from '@enums/role.enum';

export default function InstructorRoutes() {
  //const token = UseToken();
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();

  return 'instructor' === Role.INSTRUCTOR && useUserIsAuthenticated ? (
    <>
      <InstructorDash />
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/login' />
  );
}
