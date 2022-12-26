import { RiDashboardFill } from 'react-icons/ri';

import Dashboard from '@/components/dashboard/Dashboard';

const navLinks = {
  Dashboard: { path: '/admin/dashboard', icon: <RiDashboardFill /> },
  'Create User': { path: '/admin/create-user', icon: <></> },
  'Course Requests': { path: '/admin/course-requests', icon: <></> },
  Reports: { path: '/admin/reports', icon: <></> },
  Discounts: { path: '/admin/courses-discounts', icon: <></> },
  Refunds: { path: '/admin/refunds', icon: <></> }
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
