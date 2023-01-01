import CourseRating from './CourseRating';

import { ICourse } from '@/interfaces/course.interface';

import Price from '@/components/courseCard/Price';
import useCourseButtons from '@/hooks/useCourseButtons';
import {
  useWishListDeleteQuery,
  useCartDeleteQuery,
  addtoCart
} from '@/components/courseCard/cardButtons/buttons';
import usePostQuery from '@/hooks/usePostQuery';
import {
  UseCartStoreInCart,
  UseCartStoreAddCourse,
  UseCartStoreRemoveCourse
} from '@/store/cartStore';
import { UseUser } from '@/store/userStore';
import {
  UseWishListRemoveCourse,
  UseWishListInCart
} from '@/store/wishListStore';
import { IUser } from '@/interfaces/user.interface';

function CourseFooter(props: ICourse) {
  const { addToCart, viewCourse } = useCourseButtons(props._id);
  const isInCart = UseCartStoreInCart()(props?._id);
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props?._id);
  const addCourseToCart = UseCartStoreAddCourse();
  const removeCourseToCart = UseCartStoreRemoveCourse();
  const user = UseUser();
  //Actual Post Requests
  const { mutateAsync: addToCartFromTheButton } = usePostQuery();
  //console.log(isInCart);

  //Actual Delete
  const { refetch: actualDeleteWishList } = useWishListDeleteQuery(
    user?._id as string,
    props?._id
  );
  const { refetch: actualDeleteCart } = useCartDeleteQuery(
    user?._id as string,
    props?._id
  );

  return (
    <div className='bg-dark row px-3 py-1'>
      <div className='col my-2'>
        <h5 className='text-light'>{props.title}</h5>
        <CourseRating {...props.rating} />
      </div>
      {!viewCourse && <Price {...props.price} />}
      {addToCart && (
        <div className='col my-2 float-end text-end text-light'>
          <button
            className='btn btn-light my-2'
            style={{ width: '140px' }}
            type='button'
            onClick={async () => {
              const xx = await addtoCart(
                props?._id,
                isInCart,
                isInWishList,
                user as IUser,
                addCourseToCart,
                removeCourseToWishList,
                removeCourseToCart,
                addToCartFromTheButton
              );
              if (xx == 1) {
                await actualDeleteCart();
              } else if (xx == 2) {
                await actualDeleteWishList();
              }
            }}
          >
            {!isInCart && <strong>Add to Cart</strong>}
            {isInCart && <strong>Remove from Cart</strong>}
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseFooter;
