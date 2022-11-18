import { Outlet } from 'react-router-dom';

import AdminDash from '@/pages/admin/AdminDash';

export default function AdminRoutes() {
  return (
    <>
      <AdminDash />
      <Outlet />
    </>
  );
}
