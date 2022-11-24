import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { UseUserIsAuthenticated } from '@store/userStore';
import './course-card-buttons.scss';

import { useCartStoreInCart } from '@store/cartStore';
import { UseWishListInCart } from '@store/wishListStore';

function CourseCardButtons({ _id }: { _id: string }) {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const isInCart = useCartStoreInCart()(_id);
  const isInWishList = UseWishListInCart()(_id);

  return (
    <>
      {useUserIsAuthenticated ? (
        <div className='d-flex flex-row justify-content-between'>
          <button type='button' onClick={undefined}>
            <AiOutlineHeart className='icon' />
          </button>
          <button type='button' onClick={undefined}>
            <AiOutlineShoppingCart className='icon' />
          </button>
        </div>
      ) : (
        <NavLink replace state={{ from: '/course/' + _id }} to='/auth/login'>
          <div className='d-flex flex-row justify-content-between'>
            {isInWishList && <AiOutlineHeart className='icon' />}
            {isInCart && <AiOutlineShoppingCart className='icon' />}
          </div>
        </NavLink>
      )}
    </>
  );
}

export default CourseCardButtons;
