import { Outlet } from 'react-router-dom';

import AdminDash from '@pages/Admin/AdminDash';

export default function AdminRoutes() {
  return (
    <>
      <AdminDash />
      <Outlet />
    </>
  );
}
