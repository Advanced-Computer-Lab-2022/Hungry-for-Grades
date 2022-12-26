/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Overlay from 'react-bootstrap/Overlay';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';

import { RiDashboardFill } from 'react-icons/ri';

import styles from './UserDropdown.module.scss';

import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';
import { UseTraineeNoteStoreNotes } from '@store/noteStore';

import { AuthRoutes } from '@/services/axios/dataServices/AuthDataService';
import { postRequest } from '@/services/axios/http-verbs';
import { removeInfo } from '@/services/savedInfo/SavedInfo';
import { UseUser, UseUserStoreLogOut } from '@store/userStore';
import { Role } from '@/enums/role.enum';
function MenuHeadersExample() {
  const [show, setShow] = useState<boolean>(false);
  const target = useRef(null);
  const useUserStoreLogOut = UseUserStoreLogOut();
  const useTraineeNoteStoreNotes = UseTraineeNoteStoreNotes();
  const user = UseUser();
  async function logout() {
    try {
      if (
        user &&
        user.role.toLocaleLowerCase() === Role.TRAINEE.toLocaleLowerCase() &&
        useTraineeNoteStoreNotes !== null
      ) {
        const storeNotes = Object.assign({}, TraineeRoutes.POST.storeNotes);
        storeNotes.payload = {
          notes: useTraineeNoteStoreNotes
        };
        await postRequest(storeNotes);
      }
      await postRequest(AuthRoutes.POST.logout);
    } catch (e) {
      console.log(e);
    }
    removeInfo();
    useUserStoreLogOut();
    useNavigate()('/auth/login', { replace: true });
  }
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
              <NavDropdown.Item>
                <NavLink
                  style={{ color: 'inherit' }}
                  to={`/${user.role}/dashboard`}
                >
                  <RiDashboardFill className={styles.nav__icon} />
                  Dashboard
                </NavLink>
              </NavDropdown.Item>
              <hr />
              <NavDropdown.Item>
                <NavLink
                  style={{ color: 'inherit' }}
                  to={`/${user.role}/profile`}
                >
                  <IoSettingsOutline className={styles.nav__icon} /> Settings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                <button
                  style={{
                    color: 'inherit',
                    outline: 'none',
                    border: 'none',
                    fontWeight: 'normal'
                  }}
                  type='button'
                  onClick={async function x() {
                    await logout();
                  }}
                >
                  <FiLogOut className={styles.nav__icon} /> Log Out
                </button>
              </NavDropdown.Item>
            </div>
          )}
        </Overlay>
      </>
    )
  );
}

export default MenuHeadersExample;
