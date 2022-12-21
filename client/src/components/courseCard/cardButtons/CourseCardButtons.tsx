import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { HiShoppingCart } from 'react-icons/hi';

import styles from './course-card-buttons.module.scss';

import { UseUserIsAuthenticated } from '@store/userStore';

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

function CourseCardButtons(props: ICart) {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const isInCart = UseCartStoreInCart()(props._id);
  const addCourseToWishList = UseWishListAddCourse();
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props._id);
  const addCourseToCart = UseCartStoreAddCourse();
  const removeCourseToCart = UseCartStoreRemoveCourse();

  console.log(isInCart);
  function addtoWishList(course: ICart) {
    if (!isInCart) {
      addCourseToWishList(course);
    } else {
      removeCourseToWishList(course._id);
    }
  }
  function addtoCart(course: ICart) {
    if (!isInWishList) {
      addCourseToCart(course);
    } else {
      removeCourseToCart(course._id);
    }
  }

  return (
    <>
      {useUserIsAuthenticated ? (
        <div className='d-flex flex-row justify-content-between'>
          <button
            className={styles.button}
            type='button'
            onClick={() => {
              addtoWishList(props);
            }}
          >
            {isInWishList && <AiFillHeart className={styles.icon} />}
            {!isInWishList && <AiOutlineHeart className={styles.icon} />}{' '}
          </button>
          <button
            className={styles.button}
            type='button'
            onClick={() => addtoCart(props)}
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
