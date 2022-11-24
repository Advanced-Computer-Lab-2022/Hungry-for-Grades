/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore } from '@interfaces/cart.interface';

export const useWishListStore = create<
  ICartStore,
  [['zustand/devtools', never]]
>(
  devtools((set, get) => ({
    cart: [],
    addCourse: course => {
      set(state => {
        const cart = [...state.cart];
        const index = cart.findIndex(item => item._id === course._id);
        if (cart && index === -1) {
          cart.push(course);
        }
        const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
        const totalItems = cart.length;

        return { cart, totalCost, totalItems };
      });
    },
    removeCourse: _id => {
      set(state => {
        const cart = [...state.cart.filter(item => item._id !== _id)];

        const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
        const totalItems = cart.length;
        return { cart, totalCost, totalItems };
      });
    },
    setCart: cart => {
      set({ cart });
    },
    clearCart: () => {
      set({ cart: [] });
    },
    inCart: _id => {
      return get().cart.find(item => item._id === _id) !== undefined;
    },
    totalCost: 0,
    totalItems: 0
  }))
);

export const UseWishList = () => useWishListStore(state => state.cart);
export const UseWishListInCart = () => useWishListStore(state => state.inCart);

export const UseWishListTotalCost = () =>
  useWishListStore(state => state.totalCost);
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
