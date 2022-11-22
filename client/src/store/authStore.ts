import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { type IAuthStore, type IToken } from '@interfaces/token.interface';

import { Role } from '@enums/role.enum';

import LocalStorage from '@services/localStorage/LocalStorage';

const INTIAL_TOKEN: IToken = {
  accessToken: '',
  expiresIn: 0,
  refreshToken: '',
  role: Role.NONE
};
const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

export const useAuthStore = create<
  IAuthStore,
  [['zustand/devtools', never], ['zustand/persist', IAuthStore]]
>(
  devtools(
    persist(
      (set, get) => ({
        token: (LocalStorage.get('token') as IToken) ?? INTIAL_TOKEN,
        setToken: token => {
          set({ token });
        },
        updateAccessToken: accessToken => {
          set({
            token: {
              ...get().token,
              accessToken: accessToken
            }
          });
        },
        removeToken: () => {
          set({ token: INTIAL_TOKEN });
        }
      }),
      {
        name: (STORAGE_KEYS_PREFIX + 'token').toUpperCase(),
        getStorage: () => localStorage
      }
    )
  )
);

export const UseAuthStoreToken = () => useAuthStore(state => state.token);

export const UseAuthStoreSetToken = () => useAuthStore(state => state.setToken);
export const UseAuthStoreUpdateAccessToken = () =>
  useAuthStore(state => state.updateAccessToken);
export const UseAuthStoreRemoveToken = () =>
  useAuthStore(state => state.removeToken);
