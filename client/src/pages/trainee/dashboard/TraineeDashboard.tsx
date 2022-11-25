import { NavLink } from 'react-router-dom';

import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';

import styles from './trainee-dashboard.module.scss';
function navIsActive({ isActive }: { isActive: boolean }) {
  return `${isActive ? styles.active__link ?? '' : ''} ${
    styles.listitem ?? ''
  }`;
}

const navLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/courses', icon: <BsFillBookFill /> },
  Wishlist: { path: '/trainee/wishlist', icon: <AiFillHeart /> },
  Cart: { path: '/trainee/cart', icon: <HiShoppingCart /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> }
};
function TraineeDashboard() {
  return (
    <div>
      <div className={styles.hero}>
        <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
          <div className={styles.mylearning}>My learning</div>
          <div className={styles.list}>
            {Object.keys(navLinks).map((key: string) => (
              <div key={key} style={{ marginRight: '3.2rem' }}>
                <NavLink
                  className={navIsActive}
                  style={{ color: 'inherit' }}
                  to={navLinks[key].path as string}
                >
                  <span className=''>{navLinks[key].icon}</span> &nbsp;{key}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TraineeDashboard;
