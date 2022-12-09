/* eslint-disable css-modules/no-unused-class */
/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Overlay from 'react-bootstrap/Overlay';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink, Link } from 'react-router-dom';

import styles from './UserDropdown.module.scss';

import { UseUserStoreLogOut, UseUser } from '@store/userStore';
function MenuHeadersExample() {
  const [show, setShow] = useState<boolean>(false);
  const target = useRef(null);
  const useUserStoreLogOut = UseUserStoreLogOut();
  const user = UseUser();

  return (
    user && (
      <>
        <button
          className={styles.user__avatar ?? ''}
          type='button'
          onClick={() => setShow(!show)}
        >
          <img
            ref={target}
            alt='profile'
            loading='lazy'
            src={user?.profileImage ?? 'https://via.placeholder.com/50'}
            style={{
              borderRadius: '50%',
              width: '3.5rem',
              height: '3.2rem',
              objectFit: 'cover'
            }}
            onError={e => {
              e.currentTarget.src = 'https://via.placeholder.com/50';
            }}
          />
        </button>
        <Overlay placement='bottom' show={show} target={target.current}>
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              className={styles.dropdown__menu ?? ''}
              style={{
                borderRadius: 3,
                ...props.style,
                marginTop: '10px',
                zIndex: 9999
              }}
            >
              <NavDropdown.Item>
                <NavLink
                  style={{ color: 'inherit' }}
                  to={`/${user.role}/profile`}
                >
                  <FiUser className={styles.nav__icon} />
                  Personal Profile
                </NavLink>
              </NavDropdown.Item>
              <hr />
              <NavDropdown.Item>
                <NavLink style={{ color: 'inherit' }} to='/setiings'>
                  <IoSettingsOutline className={styles.nav__icon} /> Settings
                </NavLink>
              </NavDropdown.Item>{' '}
              <NavDropdown.Item>
                <Link
                  replace
                  style={{ color: 'inherit' }}
                  to='/'
                  onClick={useUserStoreLogOut}
                >
                  <FiLogOut className={styles.nav__icon} /> Log Out
                </Link>
              </NavDropdown.Item>
            </div>
          )}
        </Overlay>
      </>
    )
  );
}

export default MenuHeadersExample;
