class SessionStorage {
  storage: Storage;

  STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

  constructor() {
    this.storage = window.sessionStorage;
  }

  get<T>(key: string): T | string | null {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    console.log(key);
    const value = this.storage.getItem(key);
    if (value && (value.includes('{') || value.includes('['))) {
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
    console.log(key);
    if (typeof key === 'string') {
      this.storage.setItem(key, value as string);
      return;
    }

    const valueToStore = JSON.stringify(value);
    this.storage.setItem(key, valueToStore);
  }

  remove(key: string) {
    key = (this.STORAGE_KEYS_PREFIX + key).toUpperCase();
    this.storage.removeItem(key);
  }
}

export default new SessionStorage();
