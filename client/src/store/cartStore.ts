/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICartStore } from '@/interfaces/cart.interface';

export const useCartStore = create<ICartStore, [['zustand/devtools', never]]>(
  devtools(set => ({
    cart: [],
    addCourse: course => {
      //Post axios
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
      //Delete axios
      set(state => {
        const cart = [...state.cart.filter(item => item._id !== _id)];

        const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
        const totalItems = cart.length;
        return { cart, totalCost, totalItems };
      });
    },
    setCart: cart => {
      //Get Req
      // cart = GetRequest
      set({ cart });
    },
    clearCart: () => {
      //here we do empty car for axios
      set({ cart: [] });
    },
    totalCost: 0,
    totalItems: 0
  }))
);

export const UseCart = () => useCartStore(state => state.cart); //To get the Cart contents
export const UseCartTotalCost = () => useCartStore(state => state.totalCost); //To get the cart total Cost of items inside it
export const UseCartTotalItems = () => useCartStore(state => state.totalItems); //To get the length of the cart array
export const AddCourse = () => useCartStore(state => state.addCourse); //To Add The cart item (in case we can use hook inside hook then it willnupdate the database, else you should call your post request yourself)
export const RemoveCourse = () => useCartStore(state => state.removeCourse); //To Delete Course from the cart (same idea of nested hook above)
export const SetCart = () => useCartStore(state => state.setCart); //
export const ClearCart = () => useCartStore(state => state.clearCart); //Delete cart all items
