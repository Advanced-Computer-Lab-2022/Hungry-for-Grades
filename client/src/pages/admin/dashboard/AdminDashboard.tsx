import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillCreditCard } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import Dashboard from '@/components/dashboard/Dashboard';
const navLinks = {
  Dashboard: { path: '/admin/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/admin/courses', icon: <BsFillBookFill /> },
  'Rating & Reviews': { path: '/instructor/rating-review', icon: <BiNote /> },
  Payment: { path: '/admin/payment', icon: <AiFillCreditCard /> },
  Profile: { path: '/admin/profile', icon: <FiUser /> }
};

function AdminDashboard() {
  return (
    <Dashboard
      media={
        <Link
          className={`btn btn-primary `}
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--primary-color)',
            marginRight: '20px'
          }}
          to='add-course'
        >
          Create User
        </Link>
      }
      navLinks={navLinks}
      title='Admin Dashboard'
    />
  );
}
export default AdminDashboard;
