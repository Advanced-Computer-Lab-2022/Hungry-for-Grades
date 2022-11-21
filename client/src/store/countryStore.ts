import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import LocalStorage from '@services/localStorage/LocalStorage';
interface ICountry {
  country: string;
  updateCountry: (country: string) => void;
}

export const useCountryStore = create<
  ICountry,
  [['zustand/devtools', never], ['zustand/persist', ICountry]]
>(
  devtools(
    persist(
      set => ({
        country: LocalStorage.get('country') ?? 'US',
        updateCountry: country => {
          alert('country: ' + country);
          set({ country });
        }
      }),
      {
        name: 'country'
      }
    )
  )
);

export const UseCountry = () => useCountryStore(state => state.country);
export const UpdateCountry = () =>
  useCountryStore(state => state.updateCountry);
