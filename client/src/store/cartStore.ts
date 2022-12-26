/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore } from '@/interfaces/cart.interface';

export const useCartStore = create<ICartStore, [['zustand/devtools', never]]>(
  devtools((set, get) => ({
    cart: [],
    addCourse: course => {
      //Post axios
      set(state => {
        const cart = [...state.cart, course];
        const totalItems = cart.length;
        console.log(cart);
        return { cart, totalItems };
      });
    },
    removeCourse: _id => {
      //Delete axios
      set(state => {
        const cart =
          [...state.cart].filter(item => item !== _id);
        const totalItems = cart.length;
        return { cart, totalItems };
      });
    },
    setCart: newCart => {
      //Get Req
      // cart = GetRequest
      const cart = newCart;
      const totalItems = cart.length;

      set({ cart, totalItems });
    },
    clearCart: () => {
      //here we do empty car for axios
      set({ cart:[],totalItems:0 });
    },
    inCart: _id => {
      return [...get().cart].some(item => item === _id) ;
    },
    totalCost: 0,
    totalItems: 0
  }))
);

export const UseCartStoreCart = () => useCartStore(state => state.cart); //To get the Cart contents
export const UseCartStoreInCart = () => useCartStore(state => state.inCart);

export const UseCartStoreTotalItems = () =>
  useCartStore(state => state.totalItems); //To get the length of the cart array
export const UseCartStoreAddCourse = () =>
  useCartStore(state => state.addCourse); //To Add The cart item (in case we can use hook inside hook then it willnupdate the database, else you should call your post request yourself)
export const UseCartStoreRemoveCourse = () =>
  useCartStore(state => state.removeCourse); //To Delete Course from the cart (same idea of nested hook above)
export const UseCartStoreSetCart = () => useCartStore(state => state.setCart); //
export const UseCartStoreClearCart = () =>
  useCartStore(state => state.clearCart); //Delete cart all items
