import create from 'zustand';



interface ICountry {
  country: string,
  updateCountry:(country:string)=>void
}

export const useCountryStore = create<ICountry>( (set) => ({
  country: 'CA',
  updateCountry:(country) => set({country}),
}));

export const UseCountry = () => useCountryStore((state) => state.country);
export const UpdateCountry = () => useCountryStore((state) => state.updateCountry);