import { NavLink, Outlet } from 'react-router-dom';

import styles from './dashboard.module.scss';

import { type DashboardPropsType } from './types';

function navIsActive({ isActive }: { isActive: boolean }) {
  return `${isActive ? styles.active__link ?? '' : ''} ${
    styles.listitem ?? ''
  }`;
}

function Dashboard({ navLinks, title, media }: DashboardPropsType) {
  return (
    <>
      <div>
        <div className={styles.hero}>
          <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
            <div className='d-flex flex-row justify-content-between'>
              <div className={styles.mylearning}>{title}</div>
              <div>{media}</div>
            </div>
            <div className={styles.list}>
              {Object.keys(navLinks).map((key: string) => (
                <div key={key} style={{ marginRight: '3.2rem' }}>
                  <NavLink
                    className={navIsActive}
                    style={{ color: 'inherit' }}
                    to={navLinks[key]?.path as string}
                  >
                    <span className=''>{navLinks[key]?.icon}</span> &nbsp;{key}
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
