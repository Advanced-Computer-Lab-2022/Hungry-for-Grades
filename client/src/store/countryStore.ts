import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import LocalStorage from '@services/localStorage/LocalStorage';
interface ICountryStore {
  country: string;
  updateCountry: (country: string) => void;
}
const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

export const useCountryStore = create<
  ICountryStore,
  [['zustand/devtools', never], ['zustand/persist', ICountryStore]]
>(
  devtools(
    persist(
      set => ({
        country: LocalStorage.get('country') ?? 'US',
        updateCountry: country => {
          set({ country });
        }
      }),
      {
        name: (STORAGE_KEYS_PREFIX + 'country').toUpperCase()
      }
    )
  )
);

export const UseCountry = () => useCountryStore(state => state.country);
export const UpdateCountry = () =>
  useCountryStore(state => state.updateCountry);
