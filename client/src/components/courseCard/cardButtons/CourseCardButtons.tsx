import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi';

import { UseUserIsAuthenticated } from '@store/userStore';
import './course-card-buttons.scss';

import { UseCartStoreAddCourse, UseCartStoreInCart } from '@store/cartStore';
import { UseWishListInCart, UseWishListAddCourse } from '@store/wishListStore';
import { ICart } from '@/interfaces/cart.interface';

function addtoWishList(course: ICart, isInCart: boolean) {
  if (!isInCart) {
    const addCourseToWishList = UseWishListAddCourse();
    addCourseToWishList(course);
  }
}
function addtoCart(course: ICart, isInWishList: boolean) {
  if (!isInWishList) {
    const addCourseToCart = UseCartStoreAddCourse();
    addCourseToCart(course);
  }
}

function CourseCardButtons(props: ICart) {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const isInCart = UseCartStoreInCart()(props._id);
  const isInWishList = UseWishListInCart()(props._id);

  return (
    <>
      {useUserIsAuthenticated ? (
        <div className='d-flex flex-row justify-content-between'>
          <button
            type='button'
            onClick={() => addtoWishList(props, isInWishList)}
          >
            <AiOutlineHeart className='icon' />
          </button>
          <button type='button' onClick={() => addtoCart(props, isInCart)}>
            <AiOutlineShoppingCart className='icon' />
          </button>
        </div>
      ) : (
        <NavLink
          replace
          state={{ from: '/course/' + props._id }}
          to='/auth/login'
        >
          <div className='d-flex flex-row justify-content-between'>
            {isInWishList && <AiFillHeart className='icon' />}
            {!isInWishList && <AiOutlineHeart className='icon' />}
            {isInCart && <HiShoppingCart className='icon' />}
            {!isInCart && <AiOutlineShoppingCart className='icon' />}
          </div>
        </NavLink>
      )}
    </>
  );
}

export default CourseCardButtons;
