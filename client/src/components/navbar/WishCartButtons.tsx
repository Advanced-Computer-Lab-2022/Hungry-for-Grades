/* eslint-disable sonarjs/no-duplicate-string */
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import styles from './wish-cart-buttons.module.scss';

import { UseCartStoreTotalItems } from '@store/cartStore';
import { UseWishListTotalItems } from '@store/wishListStore';

import toSmallNumber from '@utils/toSmallNumber';

import './progress.scss';

import 'react-circular-progressbar/dist/styles.css';
function WishCartButtons() {
  const cartCount = UseCartStoreTotalItems();
  const wishListCount = UseWishListTotalItems();

  return (
    <>
      <div className='d-flex flex-row justify-content-between'>
        <NavLink className='mt-2' to='/trainee/cart'>
          <p className='position-relative'>
            <AiOutlineShoppingCart className={styles.icon} />
            {cartCount > 0 && (
              <span
                className={`${
                  styles.rightTop ?? ''
                } text-white badge rounded-pill bg-secondary`}
              >
                +{toSmallNumber(cartCount)}
              </span>
            )}
          </p>
        </NavLink>
        <NavLink className='mt-2 p-0' to='/trainee/wishlist'>
          <p className='p-0  position-relative'>
            <AiOutlineHeart className={styles.icon} />
            {wishListCount > 0 && (
              <span
                className={`${
                  styles.rightTop ?? ''
                } text-white badge rounded-pill bg-secondary`}
              >
                +{toSmallNumber(wishListCount)}
              </span>
            )}
          </p>
        </NavLink>
      </div>
    </>
  );
}

export default WishCartButtons;
