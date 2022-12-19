import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactFlagsSelect from 'react-flags-select';
import { Link, NavLink } from 'react-router-dom';

import ReportForm from '../footer/ReportForm';

import UserDropdown from './userDropDown/UserDropdown';

import WishCartButtons from './WishCartButtons';

import styles from './navbar.module.scss';

import { UpdateCountry, UseCountry } from '@store/countryStore';

import SearchBar from '@/components/navbar/searchBar/SearchBar';
import { UseUser, UseUserIsAuthenticated } from '@store/userStore';
import { Role } from '@/enums/role.enum';
import toSmallNumber from '@/utils/toSmallNumber';
import useCategoryQuery from '@/pages/guest/searchCourses/searchSection/filtersInput/useCategoryQuery';
import { ITrainee } from '@/interfaces/course.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

function NavbarComponent() {
  const { data, isError } = useCategoryQuery();

  const country = UseCountry();
  const updateCountry = UpdateCountry();
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const user = UseUser();
  return (
    <Navbar bg='light' className={styles.navbar} expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>CanCham</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='' style={{ marginRight: '2rem' }}>
            <NavLink
              className={function activate({ isActive }) {
                return isActive ? 'nav-link active' : 'nav-link';
              }}
              to='/courses'
            >
              <span style={{ color: 'inherit' }}>Courses</span>
            </NavLink>
            <NavDropdown id='basic-nav-dropdown' title='Explore'>
              {!isError &&
                data?.data?.map(category => (
                  <NavDropdown.Item key={category.label}>
                    <div className={styles.category__parent__link}>
                      <Link
                        className={styles.category__link}
                        to={`/courses?category=${encodeURIComponent(
                          category.label
                        )}`}
                      >
                        {category.label}
                      </Link>
                      <div
                        className={`${
                          styles.subCategory__link ?? ''
                        } d-flex flex-column`}
                      >
                        {category?.subcategory?.map(subCat => (
                          <Link
                            key={subCat.label}
                            className=''
                            to={`/courses?category=${encodeURIComponent(
                              category.label
                            )}&subCategory=${encodeURIComponent(subCat.label)}`}
                          >
                            {subCat.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavDropdown.Item>
                ))}

              {useUserIsAuthenticated && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <ReportForm />
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <SearchBar />
          <Nav className='ml-auto'>
            <Nav.Link>
              <ReactFlagsSelect
                className={styles.flag__select}
                placeholder='Country'
                selected={country}
                showSelectedLabel={false}
                onSelect={function updateCode(code) {
                  updateCountry(code);
                }}
              />
            </Nav.Link>
            {user && useUserIsAuthenticated ? (
              <div className='d-flex flex-row justify-content-evenly mt-2'>
                {user.role.toLocaleLowerCase() ===
                  Role.TRAINEE.toLocaleLowerCase() && !(user as ITrainee).isCorporate && <WishCartButtons />}

                {user.role !== Role.ADMIN && !(user as ITrainee).isCorporate && (
                  <Link
                    className={styles.user__balance}
                    to={`/${user.role.toLocaleLowerCase()}/balance`}
                  >
                    {(user as ITrainee | IInstructor)?.currency}
                    {toSmallNumber(user.balance as number)}
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
                <NavLink
                  className={`${styles.auth_btn ?? ''} nav-link`}
                  id='signup-navlink'
                  to='/auth/signup'
                >
                  <span className={styles.signup__btn}>Sign Up</span>
                </NavLink>
                <NavLink
                  className={`${styles.auth_btn ?? ''} nav-link`}
                  id='login-navlink'
                  to='/auth/login'
                >
                  <span className={styles.login__btn}>Login</span>
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
