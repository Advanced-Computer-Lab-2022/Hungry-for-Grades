
import { Outlet } from 'react-router-dom'

import AdminDash from '@components/Admin/AdminDash';

export default function AdminRoutes() {
  return (
    <>
        <AdminDash />
        <Outlet />
    </>
  )
}
