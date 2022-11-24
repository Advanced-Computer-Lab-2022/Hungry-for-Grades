import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import '@components/courseCard/course-card.module.scss';
import { UseCartTotalCost, UseCartTotalItems } from '@store/cartStore';
import {
  UseWishListTotalCost,
  UseWishListTotalItems
} from '@store/wishListStore';

function smallNumber(number: number) {
  if (number > 9999) {
    return '+' + (number / 1000).toFixed(0) + 'k';
  }
  if (number > 999) {
    return '999+';
  }
  if (number < 10) {
    return `${number}`;
  }
  return number;
}

function CourseCardButtons() {
  const cartCount = UseCartTotalItems();
  const cartCost = UseCartTotalCost();
  const wishListCount = UseWishListTotalItems();
  const wishListCost = UseWishListTotalCost();
  return (
    <>
      <NavLink replace state={{ from: '/course/' }} to='/auth/login'>
        <div className='d-flex flex-row justify-content-between'>
          <NavLink className='position-relative' to='/trainee/cart'>
            <p className='mt-2'>
              <AiOutlineShoppingCart className='icon' />
              {cartCount > 0 && (
                <span className='position-absolute top-5 start-100 translate-middle badge rounded-pill'>
                  +{cartCount}
                </span>
              )}
              {cartCost > 0 && (
                <span className='position-absolute top-5 end-100 translate-middle badge rounded-pill'>
                  +{smallNumber(cartCost)}
                </span>
              )}
            </p>
          </NavLink>
          <NavLink className='position-relative' to='/trainee/wishlist'>
            <p className='mt-2'>
              <AiOutlineHeart className='icon' />
              {wishListCount > 0 && (
                <span className='position-absolute top-5 start-100 translate-middle badge rounded-pill'>
                  +{wishListCount}
                </span>
              )}{' '}
              {wishListCost > 0 && (
                <span className='position-absolute top-5 start-100 translate-middle badge rounded-pill'>
                  +{smallNumber(wishListCost)}
                </span>
              )}
            </p>
          </NavLink>
        </div>
      </NavLink>
    </>
  );
}

export default CourseCardButtons;
