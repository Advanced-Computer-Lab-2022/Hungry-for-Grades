import { Nav } from 'react-bootstrap';

import { useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import styles from './AdminDash.module.css';

function AdminDashboard() {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <>
      <div style={{ width: '100%', backgroundColor: '#112D4E' }}>
        <div
          className='container-lg'
          style={{
            width: '100%',
            backgroundColor: '#112D4E',
            alignItems: 'center'
          }}
        >
          <br />
          <br />
          <div
            className='d-flex justify-content-between'
            style={{ alignItems: 'center' }}
          >
            <span
              style={{
                color: '#F9F7F7',
                fontSize: '1.7rem',
                fontWeight: '350'
              }}
            >
              Admin Dashboard
            </span>
          </div>
          <br />

          <Nav defaultActiveKey='/home' variant='pills'>
            <Nav.Item>
              <NavLink
                className={`nav-link ${
                  currentPath === '/admin/addadmin' ? 'active' : ''
                }`}
                to='/admin/addadmin'
              >
                <span className={styles.dashhero}>Add new Admin </span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={`nav-link ${
                  currentPath === '/admin/addinstructor' ? 'active' : ''
                }`}
                to='/admin/addinstructor'
              >
                <span className={styles.dashhero}>Add Instructor </span>{' '}
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={`nav-link ${
                  currentPath === '/admin/addcorporatetrainee' ? 'active' : ''
                }`}
                to='/admin/addcorporatetrainee'
              >
                <span className={styles.dashhero}>Add Corporate Trainee </span>{' '}
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
