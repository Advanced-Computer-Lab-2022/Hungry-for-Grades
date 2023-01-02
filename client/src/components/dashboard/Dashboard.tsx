import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './dashboard.module.scss';
import TermsModal from './TermsModal';

import { type DashboardPropsType } from './types';

import LocalStorage from '@/services/localStorage/LocalStorage';

function navIsActive({ isActive }: { isActive: boolean }) {
  return `${isActive ? styles.active__link ?? '' : ''} ${
    styles.listitem ?? ''
  }`;
}

function Dashboard({ navLinks, title, media }: DashboardPropsType) {
  const firstLogin = LocalStorage.get('firstLogin');
  const [openModal, setOpenModal] = useState(false);
  if (firstLogin === 'true' && openModal === false) {
    setOpenModal(true);
  }
  return (
    <>
      <div>
        <div className={styles.hero}>
          <div className='container' style={{ marginTop: '2rem' }}>
            <div className='d-flex flex-row justify-content-between'>
              <div className={styles.mylearning}>{title}</div>
              <div>{media}</div>
            </div>
            <Navbar collapseOnSelect className='container' expand='lg'>
              <Container className={styles.list}>
                <Navbar.Toggle
                  aria-controls='responsive-navbar-nav'
                  className='w-20 '
                  style={{
                    backgroundColor: '#d1d7dc',
                    marginRight: '0',
                    marginLeft: 'auto'
                  }}
                />
                <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className={`me-auto`}>
                    {Object.keys(navLinks).map((key: string) => (
                      <NavLink
                        key={key}
                        className={navIsActive}
                        style={{ marginRight: '3rem' }}
                        to={navLinks[key]?.path as string}
                      >
                        <span>
                          {navLinks[key]?.icon}&nbsp; {key}
                        </span>{' '}
                      </NavLink>
                    ))}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
      <TermsModal
        handleClose={function () {
          setOpenModal(false);
          LocalStorage.set('firstLogin', 'false');
        }}
        show={openModal}
      />
      <Outlet />
    </>
  );
}
export default Dashboard;
