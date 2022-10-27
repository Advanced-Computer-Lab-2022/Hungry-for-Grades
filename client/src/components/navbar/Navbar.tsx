/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactFlagsSelect from 'react-flags-select';
import { Link, NavLink, useLocation } from 'react-router-dom';

import './Navbar.scss';
import UserDropdown from './userDropDown/UserDropdown';
function NavbarComponent() {
  const location = useLocation();
  const [selected, setSelected] = useState('');

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  /*
 const categories = [
    {
      name: 'Web Development',
      subCatregories: [
        { name: 'All', link: '/products' },
        { name: 'Clothing', link: '/products/clothing' },
        { name: 'Shoes', link: '/products/shoes' }
      ]
    },
    { name: 'Clothing', path: '/products/clothing' },
    { name: 'Electronics', path: '/products/electronics' },
    { name: 'Home', path: '/products/home' },
    { name: 'Toys', path: '/products/toys' },
    { name: 'Other', path: '/products/other' }
  ];
 */
  const user = null;
  return (
    <Navbar bg='secondary' className='navbar' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>CamCham</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink
              className={`nav-link ${
                currentPath === '/courses' ? 'active' : ''
              }`}
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
                selected={selected}
                showSelectedLabel={false}
                onSelect={code => setSelected(code)}
              />
            </Nav.Link>
            {user ? (
              <Nav.Link>
                <UserDropdown />
              </Nav.Link>
            ) : (
              <>
                <NavLink className='auth_btn nav-link' to='/auth/register'>
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
