import { RiDashboardFill } from 'react-icons/ri';

import Dashboard from '@/components/dashboard/Dashboard';

const navLinks = {
  Dashboard: { path: '/admin/dashboard', icon: <RiDashboardFill /> },
  'Create User': { path: '/admin/dashboard/create-user', icon: <></> },
  'Course Requests': { path: '/admin/dashboard/course-requests', icon: <></> },
  Reports: { path: '/admin/dashboard/reports', icon: <></> },
  Discounts: { path: '/admin/dashboard/courses-discounts', icon: <></> }
  //Profile: { path: '/admin/profile', icon: <FiUser /> }
};

function AdminDashboard() {
  return (
    <>
      <Dashboard media={<></>} navLinks={navLinks} title='Admin Dashboard' />
    </>
  );
}
export default AdminDashboard;
