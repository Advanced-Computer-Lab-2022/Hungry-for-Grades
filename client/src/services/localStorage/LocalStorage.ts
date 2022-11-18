
class LocalStorage {
	storage: Storage;

	STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

	constructor() {
		this.storage = window.localStorage;
	}

	get(key: string): string | null {
		return this.storage.getItem(this.STORAGE_KEYS_PREFIX + key);
	}

	set(key: string, value: string) {
		this.storage.setItem(this.STORAGE_KEYS_PREFIX + key, value);
	}

	remove(key: string) {
		this.storage.removeItem(this.STORAGE_KEYS_PREFIX + key);
	}
}

export default new LocalStorage();
