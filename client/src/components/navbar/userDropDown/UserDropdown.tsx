/* eslint-disable css-modules/no-unused-class */
/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Overlay from 'react-bootstrap/Overlay';
import { FiUser } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

import styles from './UserDropdown.module.scss';
function MenuHeadersExample() {
  const [show, setShow] = useState<boolean>(false);
  const target = useRef(null);

  return (
    <>
      <button
        className={styles.user__avatar ?? ''}
        type='button'
        onClick={() => setShow(!show)}
      >
        <img
          ref={target}
          alt='profile'
          src='https://via.placeholder.com/50'
          style={{ borderRadius: '50%' }}
        />
      </button>
      <Overlay placement='bottom' show={show} target={target.current}>
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            className={styles.dropdown__menu ?? ''}
            style={{
              borderRadius: 3,
              ...props.style
            }}
          >
            <NavDropdown.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active__link ?? '' : undefined
                }
                style={{ color: 'inherit' }}
                to='/setiings'
              >
                <FiUser className={styles.nav__icon} />
                Personal Profile
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active__link ?? '' : undefined
                }
                style={{ color: 'inherit' }}
                to='/setiings'
              >
                Settings
              </NavLink>
            </NavDropdown.Item>
            <hr />
            <NavDropdown.Item>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active__link ?? '' : undefined
                }
                style={{ color: 'inherit' }}
                to='/setiings'
              >
                <IoSettingsOutline className={styles.nav__icon} /> Settings
              </NavLink>
            </NavDropdown.Item>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default MenuHeadersExample;
