/* eslint-disable react/jsx-no-bind */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactFlagsSelect from 'react-flags-select';
import { Link, NavLink } from 'react-router-dom';

import UserDropdown from './userDropDown/UserDropdown';

import { UpdateCountry, UseCountry } from '@store/countryStore';

import './Navbar.scss';

function NavbarComponent() {
  const country = UseCountry();
  const updateCountry = UpdateCountry();
  const user = null;
  return (
    <Navbar bg='light' className='navbar' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>CanCham</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
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
            {user ? (
              <Nav.Link>
                <UserDropdown />
              </Nav.Link>
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
