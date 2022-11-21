/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore } from '@interfaces/cart.interface';

export const useCartStore = create<ICartStore, [['zustand/devtools', never]]>(
  devtools(set => ({
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
    totalCost: 0,
    totalItems: 0
  }))
);

export const UseCart = () => useCartStore(state => state.cart);
export const UseCartTotalCost = () => useCartStore(state => state.totalCost);
export const UseCartTotalItems = () => useCartStore(state => state.totalItems);
export const AddCourse = () => useCartStore(state => state.addCourse);
export const RemoveCourse = () => useCartStore(state => state.removeCourse);
export const SetCart = () => useCartStore(state => state.setCart);
export const ClearCart = () => useCartStore(state => state.clearCart);
