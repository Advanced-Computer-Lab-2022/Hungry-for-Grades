import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { UseUserIsAuthenticated } from '@store/userStore';
import './course-card-buttons.scss'

function CourseCardButtons() {
  const useUserIsAuthenticated = UseUserIsAuthenticated();

  return (
    <>
      {!useUserIsAuthenticated && (
        <NavLink to='/auth/login'>
          <div className='d-flex flex-row justify-content-between'>
            <AiOutlineHeart className='' />
            <AiOutlineShoppingCart className='' />
          </div>
        </NavLink>
      )}
    </>
  );
}

export default CourseCardButtons;
