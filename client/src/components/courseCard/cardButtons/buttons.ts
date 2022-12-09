import { ICart } from '@/interfaces/cart.interface';
import { UseCartStoreAddCourse } from '@/store/cartStore';
import { UseWishListAddCourse } from '@/store/wishListStore';

export function addtoWishList(course: ICart, isInCart: boolean) {
  if (!isInCart) {
    const addCourseToWishList = UseWishListAddCourse();
    addCourseToWishList(course);
  }
}
export function addtoCart(course: ICart, isInWishList: boolean) {
  if (!isInWishList) {
    const addCourseToCart = UseCartStoreAddCourse();
    addCourseToCart(course);
  }
}
