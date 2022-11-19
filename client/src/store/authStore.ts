import create from 'zustand';

import { type IAuth, type Token } from '@interfaces/token.interface';

import { Role } from '@enums/role.enum';

import LocalStorage from '@services/localStorage/LocalStorage';

const INTIAL_TOKEN = {
  access_token: '',
  expires_in: 0,
  refresh_token: '',
  role: Role.NONE
};

export const useAuthStore = create<IAuth>(set => ({
  token: (LocalStorage.get('token') as Token) ?? INTIAL_TOKEN,
  isAuthenticated: (LocalStorage.get('token') as Token | null) ? true : false,
  updateToken: token => {
    LocalStorage.set('token', token);

    set({ token, isAuthenticated: true });
  },
  removeToken: () => {
    LocalStorage.remove('token');
    set({ token: INTIAL_TOKEN, isAuthenticated: false });
  }
}));

export const UseToken = () => useAuthStore(state => state.token);
export const UseIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const UpdateToken = () => useAuthStore(state => state.updateToken);
export const RemoveToken = () => useAuthStore(state => state.removeToken);
