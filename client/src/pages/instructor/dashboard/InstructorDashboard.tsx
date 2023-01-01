import { BiNote } from 'react-icons/bi';
import { BsFillBookFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { RiDashboardFill } from 'react-icons/ri';

import { Link } from 'react-router-dom';

import { VscReport } from 'react-icons/vsc';

import styles from './instructor-dashboard.module.scss';

import Dashboard from '@/components/dashboard/Dashboard';
const navLinks = {
  Dashboard: { path: '/instructor/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/instructor/my-courses', icon: <BsFillBookFill /> },
  'Rating & Reviews': { path: '/instructor/rating-review', icon: <BiNote /> },
  Reports: { path: '/instructor/reports' ,icon:<VscReport/>},
  Profile: { path: '/instructor/profile', icon: <FiUser /> }
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
