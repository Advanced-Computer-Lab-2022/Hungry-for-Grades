import { NavLink } from 'react-router-dom';

import styles from './trainee-dashboard.module.scss';

function navIsActive({ isActive }: { isActive: boolean }) {
  return `${isActive ? styles.active__link ?? '' : ''} ${
    styles.listitem ?? ''
  }`;
}
function TraineeDashboard() {
  return (
    <div>
      <div className={styles.hero}>
        <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
          <div className={styles.mylearning}>My learning</div>
          <div className={styles.list}>
            <div style={{ marginRight: '3.2rem' }}>
              <NavLink
                className={navIsActive}
                style={{ color: 'inherit' }}
                to='/trainee/courses'
              >
                Courses
              </NavLink>
            </div>
            <div style={{ marginRight: '3.2rem' }}>
              <NavLink
                className={navIsActive}
                style={{ color: 'inherit' }}
                to='/trainee/cart'
              >
                Cart
              </NavLink>
            </div>
            <div style={{ marginRight: '3.2rem' }}>
              <NavLink
                className={navIsActive}
                style={{ color: 'inherit' }}
                to='/trainee/wishlist'
              >
                WishList
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TraineeDashboard;
