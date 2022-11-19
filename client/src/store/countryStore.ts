import create from 'zustand';

import LocalStorage from '@services/localStorage/LocalStorage';
interface ICountry {
  country: string;
  updateCountry: (country: string) => void;
}

export const useCountryStore = create<ICountry>(set => ({
  country: LocalStorage.get('country') ?? 'US',
  updateCountry: country => {
    LocalStorage.set('country', country);
    set({ country });
  }
}));

export const UseCountry = () => useCountryStore(state => state.country);
export const UpdateCountry = () =>
  useCountryStore(state => state.updateCountry);
