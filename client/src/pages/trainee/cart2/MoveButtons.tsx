import { useQuery } from '@tanstack/react-query';

import styles from './MoveButton.module.scss';

import { IUser } from '@/interfaces/user.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { deleteRequest, postRequest } from '@/services/axios/http-verbs';
import { POSTRoutesType } from '@/services/axios/types';
import { UseUser } from '@/store/userStore';
import { UseCartStoreRemoveCourse } from '@/store/cartStore';
import { UseWishListAddCourse } from '@/store/wishListStore';
import { ICart } from '@/interfaces/cart.interface';

function remove(courseId: string, user: IUser) {
  const Courses = TraineeRoutes.DELETE.removeFromCart;

  Courses.URL = `/trainee/${user?._id}/cart/${courseId}`;

  return deleteRequest(Courses);
}

function move(courseId: string, user: IUser) {
  const Courses = TraineeRoutes.POST.addToWishlist;

  Courses.URL = `/trainee/${user?._id}/wishlist/${courseId}`;

  return postRequest(Courses as POSTRoutesType);
}

export default function MoveButtons(props: {
  id: string;
  updatePage: () => void;
  refreshPage: () => void;
  price: number;
}) {
  const removeFromCart = UseCartStoreRemoveCourse();

  const addToWishlist = UseWishListAddCourse();

  const user = UseUser();

  const { refetch } = useQuery(
    ['ASJLHFXYZZZY'],
    () => remove(props.id, user as IUser),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000, // 1 second
      enabled: false
    }
  );

  const { refetch: moveToWishListRefetch } = useQuery(
    ['ASJLHFXYZZZYX'],
    () => move(props.id, user as IUser),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000, // 1 second
      enabled: false
    }
  );

  async function handleMoveToWishList() {
    await refetch();
    await moveToWishListRefetch();
    removeFromCart(props?.id);
    const icart: ICart = { _id: props?.id, price: props?.price };
    addToWishlist(icart);
    props?.refreshPage();
    props?.updatePage();
  }

  async function handleRemoveFromCart() {
    await refetch();
    removeFromCart(props?.id);
    props?.refreshPage();
    props?.updatePage();
  }

  return (
    <div className={styles.actions}>
      <button type='button' onClick={() => handleRemoveFromCart()}>
        <span>Remove</span>
      </button>
      <button type='button' onClick={() => handleMoveToWishList()}>
        <span>Move to Whishlist</span>
      </button>
    </div>
  );
}
