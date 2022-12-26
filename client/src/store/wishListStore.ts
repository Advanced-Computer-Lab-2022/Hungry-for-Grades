/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore } from '@interfaces/cart.interface';

export const useWishListStore = create<
  ICartStore,
  [['zustand/devtools', never]]
>(
  devtools((set, get) => ({
    cart: new Set<string>([]),
    addCourse: course => {
      //Post axios
      set(state => {
        const cart = new Set<string>([...state.cart, course]);
        const totalItems = cart.size;
        return { cart, totalItems };
      });
    },
    removeCourse: _id => {
      //Delete axios
      set(state => {
        const cart = new Set<string>(
          [...state.cart].filter(item => item !== _id)
        );
        const totalItems = cart.size;
        return { cart, totalItems };
      });
    },
    setCart: newCart => {
      //Get Req
      // cart = GetRequest
      const cart = new Set<string>(newCart);
      const totalItems = cart.size;

      set({ cart, totalItems });
    },
    clearCart: () => {
      //here we do empty car for axios
      set({ cart: new Set<string>([]) });
    },
    inCart: _id => {
      return [...get().cart].some(item => item === _id);
    },
    totalCost: 0,
    totalItems: 0
  }))
);

export const UseWishList = () => useWishListStore(state => state.cart);
export const UseWishListInCart = () => useWishListStore(state => state.inCart);

export const UseWishListTotalItems = () =>
  useWishListStore(state => state.totalItems);
export const UseWishListAddCourse = () =>
  useWishListStore(state => state.addCourse);
export const UseWishListRemoveCourse = () =>
  useWishListStore(state => state.removeCourse);
export const UseWishListSetCart = () =>
  useWishListStore(state => state.setCart);
export const UseWishListClearCart = () =>
  useWishListStore(state => state.clearCart);
