import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { HiShoppingCart } from 'react-icons/hi';

import styles from './course-card-buttons.module.scss';

import {
  addtoWishList,
  addtoCart,
  useCartDeleteQuery,
  useWishListDeleteQuery
} from './buttons';

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

import { IUser } from '@/interfaces/user.interface';
import usePostQuery from '@/hooks/usePostQuery';

function CourseCardButtons(props: { id: string }) {
  const useUserIsAuthenticated = UseUserIsAuthenticated();
  const isInCart = UseCartStoreInCart()(props?.id);
  const addCourseToWishList = UseWishListAddCourse();
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props?.id);
  const addCourseToCart = UseCartStoreAddCourse();
  const removeCourseToCart = UseCartStoreRemoveCourse();
  const user = UseUser();
  //Actual Post Requests
  const { mutateAsync: addToWishListFromTheButton } = usePostQuery();
  const { mutateAsync: addToCartFromTheButton } = usePostQuery();

  console.log(isInCart);

  //Actual Delete
  const { refetch: actualDeleteWishList } = useWishListDeleteQuery(
    user?._id as string,
    props?.id
  );
  const { refetch: actualDeleteCart } = useCartDeleteQuery(
    user?._id as string,
    props?.id
  );

  return (
    <>
      {useUserIsAuthenticated ? (
        <div className='d-flex flex-row justify-content-between'>
          <button
            className={styles.button}
            type='button'
            onClick={async () => {
              const xx = await addtoWishList(
                props?.id,
                isInCart,
                isInWishList,
                user as IUser,
                addCourseToWishList,
                removeCourseToWishList,
                removeCourseToCart,
                addToWishListFromTheButton
              );
              if (xx === 1) {
                await actualDeleteCart();
              } else if (xx === 2) {
                //alert('I will Delete Back ' + props?.id);
                await actualDeleteWishList();
                //alert('Done');
              }
            }}
          >
            {isInWishList && <AiFillHeart className={styles.icon} />}
            {!isInWishList && <AiOutlineHeart className={styles.icon} />}{' '}
          </button>
          <button
            className={styles.button}
            type='button'
            onClick={async () => {
              const xx = await addtoCart(
                props?.id,
                isInCart,
                isInWishList,
                user as IUser,
                addCourseToCart,
                removeCourseToWishList,
                removeCourseToCart,
                addToCartFromTheButton
              );
              if (xx === 1) {
                await actualDeleteCart();
              } else if (xx === 2) {
                await actualDeleteWishList();
              }
            }}
          >
            {isInCart && <HiShoppingCart className={styles.icon} />}
            {!isInCart && <AiOutlineShoppingCart className={styles.icon} />}
          </button>
        </div>
      ) : (
        <NavLink
          replace
          state={{ from: '/course/' + props.id }}
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
