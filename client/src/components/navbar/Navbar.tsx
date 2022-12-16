/* eslint-disable react/jsx-no-bind */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactFlagsSelect from 'react-flags-select';
import { Link, NavLink } from 'react-router-dom';

import UserDropdown from './userDropDown/UserDropdown';

import WishCartButtons from './WishCartButtons';

import { UpdateCountry, UseCountry } from '@store/countryStore';

import SearchBar from '@/components/navbar/searchBar/SearchBar';
import { UseUser, UseUserIsAuthenticated } from '@store/userStore';
import { Role } from '@enums/role.enum';
import './Navbar.scss';
import toSmallNumber from '@/utils/toSmallNumber';

function NavbarComponent() {
  const country = UseCountry();
  const updateCountry = UpdateCountry();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const user = UseUser();

  return (
    <Navbar bg='light' className='navbar' expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>CanCham</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='' style={{ marginRight: '2rem' }}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              to='/courses'
            >
              <span style={{ color: 'inherit' }}>Courses</span>
            </NavLink>
            <NavDropdown id='basic-nav-dropdown' title='Explore'>
              <NavDropdown.Item>
                <Link to='/courses'>Courses</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Navbar </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Image</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.4'>
                Image Slider
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.5'>Image</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.6'>Div</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.6'>Footer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.9'>
                Documentation{' '}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <SearchBar />
          <Nav className='ml-auto'>
            <Nav.Link>
              <ReactFlagsSelect
                className='flag__select'
                placeholder='Country'
                selected={country}
                showSelectedLabel={false}
                onSelect={code => updateCountry(code)}
              />
            </Nav.Link>
            {user && useUserIsAuthenticated ? (
              <div className='d-flex flex-row justify-content-evenly'>
                {user.role.toLocaleLowerCase() ===
                    Role.TRAINEE.toLocaleLowerCase() && <WishCartButtons />}
                {user.role.toLocaleLowerCase() !==
                    Role.ADMIN.toLocaleLowerCase() &&
                    user?.balance && (
                      <Link
                        className='user__balance balance__title'
                        to={`${user.role.toLocaleLowerCase()}/balance`}
                      >
                        $ {toSmallNumber(user.balance)}
                      </Link>
                    )}
                  <Link to={`/${user.role.toLocaleLowerCase()}/dashboard`}>
                    <div className='text-muted py-3 mx-3 w-100 px-0 text-truncate'>
                      {user.name}
                    </div>
                  </Link>
                <UserDropdown />
              </div>
            ) : (
              <>
                <NavLink className='auth_btn nav-link' to='/auth/signup'>
                  <span className='signup__btn'>Sign Up</span>
                </NavLink>
                <NavLink className='auth_btn nav-link' to='/auth/login'>
                  <span className='login__btn'>Login</span>
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
