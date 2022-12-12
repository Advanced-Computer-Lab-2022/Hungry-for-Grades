/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import SessionStorage from '@/services/sessionStorage/SessionStorage';

import { type IUser } from '@interfaces/user.interface';
import { removeInfo } from '@/services/savedInfo/SavedInfo';

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  getUser: () => IUser | null;
  logOut: () => void;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useUserStore = create<IUserStore, [['zustand/devtools', never]]>(
  devtools(set => ({
    user: SessionStorage.get<IUser>('user') as IUser | null,
    isAuthenticated: SessionStorage.get<IUser>('user') ? true : null,
    setUser: (user: IUser) => {
      SessionStorage.set<IUser>('user', { ...user });

      set({ user, isAuthenticated: true });
    },
    getUser: () => SessionStorage.get<IUser>('user') as IUser | null,
    setIsAuthenticated: (isAuthenticated: boolean | null) =>
      set({ isAuthenticated }),
    logOut: () => {
      removeInfo();
      window.location.replace('/');
      set({ user: null, isAuthenticated: false });
    }
  }))
);

export const UseUser = () => useUserStore(state => state.user);

export const UseSetUser = () => useUserStore(state => state.setUser);
export const UseUserStoreLogOut = () => useUserStore(state => state.logOut);
export const UseUserIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated);
export const UseUserSetIsAuthenticated = () =>
  useUserStore(state => state.setIsAuthenticated);
