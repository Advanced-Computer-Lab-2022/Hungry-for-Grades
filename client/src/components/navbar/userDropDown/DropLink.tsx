/* eslint-disable css-modules/no-unused-class */
/* eslint-disable react/jsx-no-bind */
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import { ReactNode } from 'react';

//import styles from './Dropdown.module.scss';

type DropdownProps = {
  link: string;
  name: string;
  icon: ReactNode;
};
function DropLink(props: DropdownProps) {
  const { link, name, icon } = props;
  return (
    <NavDropdown.Item>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'styles.active__link' ?? '' : undefined
        }
        style={{ color: 'inherit' }}
        to={link}
      >
        <span className='d-flex flex-row justif-content-between'>
          <span>{icon} </span>
          <span>{name}</span>
        </span>
      </NavLink>
    </NavDropdown.Item>
  );
}

export default DropLink;
