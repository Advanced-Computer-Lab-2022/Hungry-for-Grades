import { toastOptions } from '@/components/toast/options';
import usePostQuery from '@/hooks/usePostQuery';
import { ICart } from '@/interfaces/cart.interface';
import { IUser } from '@/interfaces/user.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { deleteRequest } from '@/services/axios/http-verbs';
import { POSTRoutesType } from '@/services/axios/types';
import { UseCartStoreAddCourse, UseCartStoreRemoveCourse } from '@/store/cartStore';
import { UseWishListAddCourse } from '@/store/wishListStore';
import { MutateOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { e } from 'vitest/dist/index-40e0cb97';

function removeCourseFromCartBackend(userID : string, courseID : string)
{
  const course = TraineeRoutes.DELETE.removeFromCart;
  course.URL = `/trainee/${userID}/cart/${courseID}`;

  return deleteRequest(course);

}

function removeCourseFromWishListBackend(userID : string, courseID : string)
{
  const course = TraineeRoutes.DELETE.renoveFromWishList;
  course.URL = `/trainee/${userID}/wishlist/${courseID}`;

  return deleteRequest(course);

}

function useCartDeleteQuery(userID : string, courseID : string)
{
  return {
    ...useQuery(
      ['cart-button-toBeRemovedFromCartToBeAddedToWishList'],
      () => removeCourseFromCartBackend(userID, courseID),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    )
  };
}

function useishListDeleteQuery(userID : string, courseID : string)
{
  return {
    ...useQuery(
      ['cart-button-toBeRemovedFromWishLsitOnButtonClick'],
      () => removeCourseFromWishListBackend(userID, courseID),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    )
  };

}

export async function addtoWishList(course: ICart, isInCart: boolean, isInWihsList : boolean, user : IUser, addCourseToWishListt: { (course: ICart): void; (arg0: ICart): void; },
removeCourseFromWishList: { (_id: string): void;} , removeFromCart: { (_id: string): void; (arg0: string): void; } ,addToWishListFromTheButton: { (variables: POSTRoutesType, options?: MutateOptions<AxiosResponse<unknown, any>, unknown, POSTRoutesType, unknown> ): Promise<AxiosResponse<unknown, any>>; (arg0: { URL: string; params: string; query: string; payload: {}; }): any; } ) {

  alert(isInCart + ' ' + isInWihsList);
  if(!isInWihsList){
    if (isInCart) {
      
      removeFromCart(course?._id as string);
      await useCartDeleteQuery(user?._id as string, course?._id);
    }
    addCourseToWishListt(course);
    const toBeAdded = TraineeRoutes.POST.addToWishlist;
      toBeAdded.URL = `/trainee/${user?._id as string}/wishlist/${course?._id}`;
      await addToWishListFromTheButton(toBeAdded);
      alert('Added')
      toast.success(
        'Course is Added to the Wishlist successfully...',
        toastOptions
      );
  }
  else{
    //Iam in the wishlist and i want to be removed from it right now
    removeCourseFromWishList(course?._id );
    useishListDeleteQuery(user?._id, course?._id);
    toast.success('The Course is Removed from WishList successfully...', toastOptions);
  }
}



export async function addtoCart(course: ICart, isInCart : boolean, isInWishList: boolean, user : IUser, addCourseToCart: { (course: ICart): void; (arg0: ICart): void; },removeCourseFromWishList: { (_id: string): void;}, removeFromCart: { (_id: string): void; (arg0: string): void; }, 
addToCartFromTheButton: { (variables: POSTRoutesType, options?: MutateOptions<AxiosResponse<unknown, any>, unknown, POSTRoutesType, unknown> ): Promise<AxiosResponse<unknown, any>>; (arg0: { URL: string; params: string; query: string; payload: {}; }): any; }) {

  if(isInCart)
  {
    //Now i have to remove it from that cart
    removeFromCart(course?._id);
    useCartDeleteQuery(user?._id, course?._id);
    toast.success('Course is removed from the cart successully...', toastOptions);
  }
  else
  {
    if (isInWishList) {
      //Remove it from the wishlist
      removeCourseFromWishList(course?._id);
      await useishListDeleteQuery(user?._id, course?._id);
    }
    //Then add it normaly to the cart in that case
    addCourseToCart(course);//added to the store
    const Course = TraineeRoutes.POST.addToCart;
    Course.URL = `/trainee/${user?._id}/cart/${course?._id}`;
    await addToCartFromTheButton(Course);
    toast.success(
      'Course is Added to the Cart successfully...',
      toastOptions
    );





  
  }
}
