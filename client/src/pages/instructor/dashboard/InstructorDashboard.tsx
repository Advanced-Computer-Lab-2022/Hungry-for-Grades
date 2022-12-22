import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillCreditCard } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import styles from './instructor-dashboard.module.scss';

import Dashboard from '@/components/dashboard/Dashboard';
const navLinks = {
  Dashboard: { path: '/instructor/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/instructor/my-courses', icon: <BsFillBookFill /> },
  'Rating & Reviews': { path: '/instructor/rating-review', icon: <BiNote /> },
  Payment: { path: '/instructor/payment', icon: <AiFillCreditCard /> },
  Profile: { path: '/instructor/profile', icon: <FiUser /> },
  Earnings: { path: '/instructor/earnings', icon: <></> }
};

function InstructorDashboard() {
  return (
    <Dashboard
      media={
        <Link
          className={`btn btn-primary ${styles.add_course ?? ''}`}
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
          Create Course
        </Link>
      }
      navLinks={navLinks}
      title='Instructor Dashboard'
    />
  );
}
export default InstructorDashboard;
