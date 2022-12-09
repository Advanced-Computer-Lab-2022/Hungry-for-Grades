class LocalStorage {
  storage: Storage;

  STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T>(key: string): T | string | null {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    const value = this.storage.getItem(key);
    if (
      value &&
      ((value.includes('{') && value.includes('}')) ||
        (value.includes('[') && value.includes(']')))
    ) {
      return JSON.parse(value) as T;
    }
    if (value) {
      if (value.startsWith('"') && value.endsWith('"'))
        return value.slice(1, -1);
      return value;
    }
    return null;
  }

  set<T>(key: string, value: string | T) {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    if (typeof value === 'string') {
      this.storage.setItem(key, value as string);
      return;
    }
    const valueToStore = JSON.stringify(value, null, '\t');
    this.storage.setItem(key, valueToStore);
  }

  remove(key: string) {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    this.storage.removeItem(key);
  }
}

export default new LocalStorage();
