/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore, type ICart } from '@interfaces/cart.interface';

export const useWishListStore = create<
  ICartStore,
  [['zustand/devtools', never]]
>(
  devtools((set, get) => ({
    cart: new Set<ICart>([]),
    addCourse: course => {
      //Post axios
      set(state => {
        const cart = new Set<ICart>([...state.cart, course]);
        const totalCost = [...cart].reduce((acc, item) => acc + item.price, 0);
        const totalItems = [...cart].length;
        return { cart, totalCost, totalItems };
      });
    },
    removeCourse: _id => {
      //Delete axios
      set(state => {
        const cart = new Set<ICart>(
          [...state.cart].filter(item => item._id !== _id)
        );
        const totalCost = [...cart].reduce((acc, item) => acc + item.price, 0);
        const totalItems = [...cart].length;
        return { cart, totalCost, totalItems };
      });
    },
    setCart: newCart => {
      //Get Req
      // cart = GetRequest
      const cart = new Set<ICart>(newCart);
      const totalCost = [...cart].reduce((acc, item) => acc + item.price, 0);
      const totalItems = [...cart].length;

      set({ cart, totalCost, totalItems });
    },
    clearCart: () => {
      //here we do empty car for axios
      set({ cart: new Set<ICart>([]) });
    },
    inCart: _id => {
      return [...get().cart].find(item => item._id === _id) !== undefined;
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
