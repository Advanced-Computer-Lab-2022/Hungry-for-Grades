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
  Courses: { path: '/instructor/courses', icon: <BsFillBookFill /> },
  'Rating & Reviews': { path: '/instructor/rating-review', icon: <BiNote /> },
  Payment: { path: '/instructor/payment', icon: <AiFillCreditCard /> },
  Profile: { path: '/instructor/profile', icon: <FiUser /> }
};

function TraineeDashboard() {
  return (
    <Dashboard
      media={
        <Link className={styles.add_course} to='add-course'>
          Create Course
        </Link>
      }
      navLinks={navLinks}
      title='Instructor Dashboard'
    />
  );
}
export default TraineeDashboard;
