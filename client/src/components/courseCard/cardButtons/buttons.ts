import { UseMutateAsyncFunction, useQuery } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import { toast } from 'react-toastify';

import { toastOptions } from '@/components/toast/options';

import { IUser } from '@/interfaces/user.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { deleteRequest } from '@/services/axios/http-verbs';
import { POSTRoutesType } from '@/services/axios/types';

//if the function returns 0 hence nothing need to be done in that case
// else if return 1 then a real delete request from the cart should be sent to the backend
//     else if = 2 delete from wishlist from the backend

function removeCourseFromCartBackend(userID: string, courseID: string) {
  const course = TraineeRoutes.DELETE.removeFromCart;
  course.URL = `/trainee/${userID}/cart/${courseID}`;

  return deleteRequest(course);
}

function removeCourseFromWishListBackend(userID: string, courseID: string) {
  const course = TraineeRoutes.DELETE.renoveFromWishList;
  course.URL = `/trainee/${userID}/wishlist/${courseID}`;

  return deleteRequest(course);
}

export function useCartDeleteQuery(userID: string, courseID: string) {
  return {
    ...useQuery(
      ['cart-button-toBeRemovedFromCartToBeAddedToWishList'],
      () => removeCourseFromCartBackend(userID, courseID),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: false // 1 second
      }
    )
  };
}

export function useWishListDeleteQuery(userID: string, courseID: string) {
  return {
    ...useQuery(
      ['cart-button-toBeRemovedFromWishLsitOnButtonClickk'],
      () => removeCourseFromWishListBackend(userID, courseID),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: false // 1 second
      }
    )
  };
}

export async function addtoWishList( // Return type = integer    0 --> No Actual Delete Required 1 --> Actual Delete from Cart 2 --> ACtual Delte from WishList
  course: string, //ID of the course
  isInCart: boolean, //Store boolean flag beta3 isInCart
  isInWihsList: boolean, //Store boolean flag beta3 isInWishList
  user: IUser, //Fromm UseUser
  addCourseToWishListt: { (course: string): void; (arg0: string): void }, // function addtoWishList from the wishList store
  removeCourseFromWishList: { (_id: string): void }, // function remove from WishList from the wishList store
  removeFromCart: { (_id: string): void; (arg0: string): void }, //function remove from Cart beta3t cart store
  addToWishListFromTheButon: UseMutateAsyncFunction<
    AxiosResponse<unknown, unknown>,
    unknown,
    POSTRoutesType,
    unknown
  >
) {
  if (!isInWihsList) {
    addCourseToWishListt(course);
    const toBeAdded = TraineeRoutes.POST.addToWishlist;
    toBeAdded.URL = `/trainee/${user?._id}/wishlist/${course}`;
    await addToWishListFromTheButon(toBeAdded);
    toast.success(
      'Course is Added to the Wishlist successfully...',
      toastOptions
    );
    if (isInCart) {
      removeFromCart(course);
      return 1;
    }
    return 0;
  } else {
    //Iam in the wishlist and i want to be removed from it right now
    removeCourseFromWishList(course);
    toast.success('The Course is Removed from the WishList...', toastOptions);
    return 2;
  }
}

export async function addtoCart( //Returns an integer 0 --> No ACtual Delete 1 --> ACtual Cart Delete 2 --> Actual Delete from WishList
  course: string, //Course ID
  isInCart: boolean, // flag store isInCart
  isInWishList: boolean, // flag store wishList
  user: IUser, //UseUSer
  addCourseToCart: { (course: string): void; (arg0: string): void }, //store cart function add
  removeCourseFromWishList: { (_id: string): void }, // store wishlist function remove
  removeFromCart: { (_id: string): void; (arg0: string): void }, // store cart remove
  addToCartFromTheButton: UseMutateAsyncFunction<
    AxiosResponse<unknown, unknown>,
    unknown,
    POSTRoutesType,
    unknown
  >
) {
  if (isInCart) {
    //Now i have to remove it from that cart
    removeFromCart(course);
    toast.success('The Course is Removed from the Cart...', toastOptions);
    return 1;
  } else {
    //Then add it normaly to the cart in that case
    addCourseToCart(course); //added to the store
    const Course = TraineeRoutes.POST.addToCart;
    Course.URL = `/trainee/${user?._id}/cart/${course}`;
    await addToCartFromTheButton(Course);
    toast.success('Course is Added to the Cart successfully...', toastOptions);
    if (isInWishList) {
      //Remove it from the wishlist
      removeCourseFromWishList(course);
      return 2;
    }
    return 0;
  }
}
