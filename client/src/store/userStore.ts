/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type IUser } from '@interfaces/user.interface';

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logOut: () => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<IUserStore, [['zustand/devtools', never]]>(
  devtools(set => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: IUser) => set({ user, isAuthenticated: true }),
    logOut: () => set({ user: null, isAuthenticated: false })
  }))
);

export const UseUser = () => useUserStore(state => state.user);

export const UseSetUser = () => useUserStore(state => state.setUser);
export const UseUserStoreLogOut = () => useUserStore(state => state.logOut);
export const UseUserIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated);
