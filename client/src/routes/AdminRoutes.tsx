import { Outlet } from 'react-router-dom';

import { useState } from 'react';

import Toogle from '@/components/toogle/Toogle';
import AdminDash from '@pages/Admin/AdminDash';

export default function AdminRoutes() {
  const [toogle, setToogle] = useState<{ [key: string]: boolean }>({
    corporateTrainer: false,
    admin: false,
    instructor: false
  });
  return (
    <>
      <Toogle setToogle={setToogle} toogle={toogle} />
      <AdminDash />
      <Outlet />
    </>
  );
}
