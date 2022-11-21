class LocalStorage {
  storage: Storage;

  STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T>(key: string): T | string | null {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    const value = this.storage.getItem(key);
    if (value && (value.includes('{') || value.includes('['))) {
      return JSON.parse(value) as T;
    }
    return value;
  }

  set<T>(key: string, value: string | T) {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    const valueToStore =
      typeof value === 'string' ? value : JSON.stringify(value);
    this.storage.setItem(key, valueToStore);
  }

  remove(key: string) {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    this.storage.removeItem(key);
  }
}

export default new LocalStorage();
