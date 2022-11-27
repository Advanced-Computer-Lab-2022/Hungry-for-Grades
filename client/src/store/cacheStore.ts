import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
type DataType = {
  category: string;
  subCategory: string;
};

interface ICacheStore<T> {
  data: T;
  setData: (data: T) => void;
}

const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

export const useCacheStore = create<
  ICacheStore<DataType>,
  [['zustand/devtools', never], ['zustand/persist', ICacheStore<DataType>]]
>(
  devtools(
    persist(
      set => ({
        data: {
          category: '',
          subCategory: ''
        },
        setData(data) {
          set({ data });
        }
      }),
      {
        name: (STORAGE_KEYS_PREFIX + 'cache').toUpperCase(),
        getStorage: () => localStorage
      }
    )
  )
);

export const UseCacheStoreData = () => useCacheStore(state => state.data);
export const UseCacheStoreSetData = () => useCacheStore(state => state.setData);
