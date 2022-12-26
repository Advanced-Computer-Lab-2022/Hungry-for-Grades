import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { HiShoppingCart } from 'react-icons/hi';

import styles from './course-card-buttons.module.scss';

import { UseUser, UseUserIsAuthenticated } from '@store/userStore';

import {
  UseCartStoreInCart,
  UseCartStoreAddCourse,
  UseCartStoreRemoveCourse
} from '@store/cartStore';
import {
  UseWishListInCart,
  UseWishListAddCourse,
  UseWishListRemoveCourse
} from '@store/wishListStore';
import { ICart } from '@/interfaces/cart.interface';

import { addtoWishList, addtoCart } from './buttons';
import { IUser } from '@/interfaces/user.interface';
import usePostQuery from '@/hooks/usePostQuery';

function CourseCardButtons(props: ICart) {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const isInCart = UseCartStoreInCart()(props?._id);
  const addCourseToWishList = UseWishListAddCourse();
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props._id);
  const addCourseToCart = UseCartStoreAddCourse();
  const removeCourseToCart = UseCartStoreRemoveCourse();
  const user = UseUser();
  const { mutateAsync: addToWishListFromTheButton } = usePostQuery();
  const { mutateAsync: addToCartFromTheButton } = usePostQuery();

  console.log(isInCart);
  

  return (
    <>
      {useUserIsAuthenticated ? (
        <div className='d-flex flex-row justify-content-between'>
          <button
            className={styles.button}
            type='button'
            onClick={() => {
              addtoWishList(props, isInCart, isInWishList,user as IUser, addCourseToWishList, removeCourseToWishList, removeCourseToCart,addToWishListFromTheButton);
            }}
          >
            {isInWishList && <AiFillHeart className={styles.icon} />}
            {!isInWishList && <AiOutlineHeart className={styles.icon} />}{' '}
          </button>
          <button
            className={styles.button}
            type='button'
            onClick={() => addtoCart(props, isInCart, isInWishList, user, addCourseToCart, removeCourseToWishList, removeCourseToCart, addToCartFromTheButton)}
          >
            {isInCart && <HiShoppingCart className={styles.icon} />}
            {!isInCart && <AiOutlineShoppingCart className={styles.icon} />}
          </button>
        </div>
      ) : (
        <NavLink
          replace
          state={{ from: '/course/' + props._id }}
          to='/auth/login'
        >
          <div className='d-flex flex-row justify-content-between'>
            {isInWishList && <AiFillHeart className={styles.icon} />}
            {!isInWishList && <AiOutlineHeart className={styles.icon} />}
            {isInCart && <HiShoppingCart className={styles.icon} />}
            {!isInCart && <AiOutlineShoppingCart className={styles.icon} />}
          </div>
        </NavLink>
      )}
    </>
  );
}

export default CourseCardButtons;
