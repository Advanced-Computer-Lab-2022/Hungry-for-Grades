import { useState } from 'react';

function getStorageValue(key: string, defaultValue: string): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved === null) localStorage.setItem(key, defaultValue);
    return saved !== null ? String(saved) : defaultValue;
  }
  return defaultValue;
}

function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (newValue: string) => void] {
  const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

  const [value, setValue] = useState(() => {
    return getStorageValue(STORAGE_KEYS_PREFIX + key, defaultValue);
  });

  function setItem(newValue: string) {
    localStorage.setItem(STORAGE_KEYS_PREFIX + key, newValue);
    setValue(newValue);
    window.location.reload();
  }

  return [value, setItem];
}
export default useLocalStorage;
