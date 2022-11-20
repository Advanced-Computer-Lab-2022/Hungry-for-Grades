import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { type IAuth, type IToken } from '@interfaces/token.interface';

import { Role } from '@enums/role.enum';

import LocalStorage from '@services/localStorage/LocalStorage';
import { getRequest } from '@/services/axios/http-verbs';
import { AuthRoutes } from '@/services/axios/dataServices/AuthDataService';

const INTIAL_TOKEN: IToken = {
  accessToken: '',
  expiresIn: 0,
  refreshToken: '',
  role: Role.NONE
};
const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

export const useAuthStore = create<
  IAuth,
  [['zustand/devtools', never], ['zustand/persist', IAuth]]
>(
  devtools(
    persist(
      set => ({
        token: (LocalStorage.get('token') as IToken) ?? INTIAL_TOKEN,
        isAuthenticated: LocalStorage.get('token') ? true : false,
        updateToken: token => {
          set({ token, isAuthenticated: true });
        },
        removeToken: () => {
          set({ token: INTIAL_TOKEN, isAuthenticated: false });
        },
        refresh: async () => {
          const dataService = Object.assign({}, AuthRoutes.GET.refresh);
          const response = await getRequest(dataService);
          set({ token: response.data });
        }
      }),
      {
        name: (STORAGE_KEYS_PREFIX + 'token').toUpperCase(),
        getStorage: () => localStorage
      }
    )
  )
);

export const UseToken = () => useAuthStore(state => state.token);
export const UseIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const UpdateToken = () => useAuthStore(state => state.updateToken);
export const RemoveToken = () => useAuthStore(state => state.removeToken);
