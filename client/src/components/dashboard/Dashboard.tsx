import { NavLink, Outlet } from 'react-router-dom';

import styles from './dashboard.module.scss';

import Music from '@/components/mediaPlayer/Music';

function navIsActive({ isActive }: { isActive: boolean }) {
  return `${isActive ? styles.active__link ?? '' : ''} ${
    styles.listitem ?? ''
  }`;
}

/* const navLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/enrolled-courses', icon: <BsFillBookFill /> },
  Wishlist: { path: '/trainee/wishlist', icon: <AiFillHeart /> },
  Cart: { path: '/trainee/cart', icon: <HiShoppingCart /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  Payment: { path: '/trainee/payment', icon: <AiFillCreditCard /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> }
}; */
function Dashboard({ navLinks }) {
  return (
    <>
      <div>
        <div className={styles.hero}>
          <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
            <div className='d-flex flex-row justify-content-between'>
              <div className={styles.mylearning}>My learning</div>
              <Music />
            </div>
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
      <Outlet />
    </>
  );
}
export default Dashboard;
