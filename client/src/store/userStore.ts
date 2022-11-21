/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { type IUser } from '@interfaces/user.interface';

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logOut: () => void;
}

export const useUserStore = create<IUserStore, [['zustand/devtools', never]]>(
  devtools(set => ({
    user: null,
    setUser: (user: IUser) => set({ user }),
    logOut: () => set({ user: null })
  }))
);

export const UseUser = () => useUserStore(state => state.user);

export const UseSetUser = () => useUserStore(state => state.setUser);
export const UseLogOut = () => useUserStore(state => state.logOut);
