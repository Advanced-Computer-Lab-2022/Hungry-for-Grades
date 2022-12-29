import { RiDashboardFill, RiRefund2Fill } from 'react-icons/ri';

import { VscReport } from 'react-icons/vsc';
import { AiOutlineUserAdd } from 'react-icons/ai';

import {TbDiscount2} from 'react-icons/tb'
import {FcInvite} from 'react-icons/fc'

import Dashboard from '@/components/dashboard/Dashboard';
const navLinks = {
  Dashboard: { path: '/admin/dashboard', icon: <RiDashboardFill /> },
  'Create User': { path: '/admin/create-user', icon: <AiOutlineUserAdd/> },
  'Course Requests': { path: '/admin/course-requests', icon:<FcInvite/> },
  Reports: { path: '/admin/reports', icon: <VscReport/>  },
  Discounts: { path: '/admin/courses-discounts', icon: <TbDiscount2/> },
  Refunds: { path: '/admin/refunds', icon: <RiRefund2Fill/> },
  Newsletter: { path: '/admin/newsletter', icon: <RiRefund2Fill/> },
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
