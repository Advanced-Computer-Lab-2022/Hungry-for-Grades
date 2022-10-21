import { NavLink } from 'react-router-dom';


import SearchBar from './SearchBar';

import styles from './navbar.module.css';


function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to='/home'>
        <img
          alt='Company Logo'
          className={`${styles.logo ?? ''} `}
          src='https://www.cancham.org.eg/upload/logo.png'
        />
      </NavLink>

      <ul>
        <li>
          {' '}
          <SearchBar />{' '}
        </li>
      </ul>

      <ul className={styles.right}>
        <li>
          <li>
            <NavLink to='/courses'>Courses</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
          <NavLink to='/login'>
            <button className={styles.navbutton} type='button'>
              Login
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup'>
            <button className={styles.navbutton} type='button'>
              Signup
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
