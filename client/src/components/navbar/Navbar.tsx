//import  './Navbar.scss';

import { GoSearch } from 'react-icons/go';

import styles from './Navbar.module.css';

function Navbar() {
  const isLoggedIn = false;

  return (
    <div>
      <div className='superNav border-bottom py-2 bg-dark' />
      <nav className='navbar navbar-expand-lg bg-white sticky-top navbar-light p-0 shadow-sm'>
        <div className='container' style={{ marginLeft: '2rem' }}>
          <a className='navbar-brand' href='/' style={{ marginRight: '10rem' }}>
            {' '}
            <img
              alt='Company Logo'
              className='float-left'
              src='./logo.png'
              style={{ width: '12rem', height: '6rem' }}
            />
          </a>
          <button
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
            className='navbar-toggler'
            data-bs-target='#navbarNavDropdown'
            data-bs-toggle='collapse'
            type='button'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='mx-auto my-3 d-lg-none d-sm-block d-xs-block'>
            <div className='input-group'>
              <span className='border-warning input-group-text bg-primary text-white'>
                <GoSearch />
              </span>
              <input
                className='form-control border-dark'
                placeholder='Search for anything...'
                type='text'
              />
              <button className='btn btn-primary text-white' type='button'>
                Search
              </button>
            </div>
          </div>
          <div className=' collapse navbar-collapse' id='navbarNavDropdown'>
            <div className='ms-auto d-none d-lg-block' style={{ width: '70%' }}>
              <div className='input-group'>
                <span className='border-warning input-group-text bg-primary text-white'>
                  {' '}
                  <GoSearch />{' '}
                </span>
                <input
                  className='form-control border-dark'
                  placeholder='Search for anything...'
                  type='text'
                />
                <button
                  className='btn btn-primary text-white'
                  style={{ color: '#161A1D' }}
                  type='button'
                >
                  Search
                </button>
              </div>
            </div>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <a
                  className={`${
                    styles.link || ''
                  } nav-link mx-2 text-uppercase`}
                  href='/'
                >
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className={`${
                    styles.link || ''
                  } nav-link mx-2 text-uppercase`}
                  href='/'
                >
                  Courses
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className={`${
                    styles.link || ''
                  } nav-link mx-2 text-uppercase`}
                  href='/'
                >
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className={`${
                    styles.link || ''
                  } nav-link mx-2 text-uppercase`}
                  href='/'
                >
                  <span>Cart</span>
                </a>
              </li>
            </ul>
            <ul className='navbar-nav'>
              {isLoggedIn && (
                <li
                  className='nav-item'
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div
                    className={styles.user}
                    style={{
                      backgroundImage:
                        'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpocPiLKadGwSqjYY7lXgmtnYdgocFMqX45oHDc5-OVk3ZSbn4Pami5tOGELcsENrWHus&usqp=CAU")'
                    }}
                  />
                  <a
                    className='nav-link mx-2 text-uppercase'
                    href='/'
                    style={{ color: '#161A1D', fontSize: 'medium' }}
                  >
                    name
                  </a>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li className='nav-item'>
                    <button className='btn btn-outline-dark' type='button'>
                      Signup
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button className='btn btn-outline-dark' type='button'>
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{ width: '100%', height: '0.3vh', backgroundColor: '#A4161A' }}
      />
    </div>
  );
}

export default Navbar;
