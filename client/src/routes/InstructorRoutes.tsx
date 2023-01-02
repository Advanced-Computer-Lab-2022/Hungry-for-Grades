import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UseUser, UseUserIsAuthenticated } from '@store/userStore';

import { Role } from '@/enums/role.enum';

export default function InstructorRoutes() {
  const location = useLocation();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const useUser = UseUser();

  return useUser?.role.toLocaleLowerCase() ===
    Role.INSTRUCTOR.toLocaleLowerCase() ? (
    <>
      <Outlet />
    </>
  ) : useUserIsAuthenticated ? (
    <Navigate replace state={{ from: location }} to='/unauthorized' />
  ) : (
    <Navigate replace state={{ from: location }} to='/auth/login' />
  );
}
