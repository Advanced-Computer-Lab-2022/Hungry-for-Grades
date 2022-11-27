import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import '@components/courseCard/course-card.module.scss';
import {
  UseCartStoreTotalCost,
  UseCartStoreTotalItems
} from '@store/cartStore';
import {
  UseWishListTotalCost,
  UseWishListTotalItems
} from '@store/wishListStore';

import toSmallNumber from '@utils/toSmallNumber';

function CourseCardButtons() {
  const cartCount = UseCartStoreTotalItems();
  const cartCost = UseCartStoreTotalCost();
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
                  +{toSmallNumber(cartCost)}
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
                  +{toSmallNumber(wishListCost)}
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
