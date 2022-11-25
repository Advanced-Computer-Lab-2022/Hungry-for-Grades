/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type ICartStore, ICart } from '@/interfaces/cart.interface';

export const useCartStore = create<ICartStore, [['zustand/devtools', never]]>(
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

export const UseCartStoreCart = () => useCartStore(state => state.cart); //To get the Cart contents
export const UseCartStoreInCart = () => useCartStore(state => state.inCart);
export const UseCartStoreTotalCost = () =>
  useCartStore(state => state.totalCost); //To get the cart total Cost of items inside it
export const UseCartStoreTotalItems = () =>
  useCartStore(state => state.totalItems); //To get the length of the cart array
export const UseCartStoreAddCourse = () =>
  useCartStore(state => state.addCourse); //To Add The cart item (in case we can use hook inside hook then it willnupdate the database, else you should call your post request yourself)
export const UseCartStoreRemoveCourse = () =>
  useCartStore(state => state.removeCourse); //To Delete Course from the cart (same idea of nested hook above)
export const UseCartStoreSetCart = () => useCartStore(state => state.setCart); //
export const UseCartStoreClearCart = () =>
  useCartStore(state => state.clearCart); //Delete cart all items
