import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import styles from './wish-cart-buttons.module.scss';

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
          <NavLink className='mt-2' to='/trainee/cart'>
            <p className='position-relative'>
              <AiOutlineShoppingCart className={styles.icon} />
              {cartCount > 0 && (
                <span
                  className={`${styles.right ?? ''} text-white badge rounded-pill bg-secondary`}
                >
                  +{toSmallNumber(cartCount)}
                </span>
              )}
              {cartCost > 0 && (
                <span
                  className={`${styles.rightTop ?? ''} text-white badge rounded-pill bg-secondary`}
                >
                  +{toSmallNumber(cartCost)}
                </span>
              )}
            </p>
          </NavLink>
          <NavLink className='mt-2 p-0' to='/trainee/wishlist'>
            <p className='p-0  position-relative'>
              <AiOutlineHeart className={styles.icon} />
              {wishListCount > 0 && (
                <span
                  className={`${styles.right ?? ''} text-white badge rounded-pill bg-secondary`}
                >
                  +{toSmallNumber(wishListCount)}
                </span>
              )}{' '}
              {wishListCost > 0 && (
                <span
                  className={`${styles.rightTop ?? ''} text-white badge rounded-pill bg-secondary`}
                >
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
