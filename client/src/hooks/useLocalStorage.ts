import { useState } from 'react';

import LocalStorage from '@/services/localStorage/LocalStorage';

function getStorageValue(key: string, defaultValue: string): string {
	if (typeof window !== 'undefined') {
		const saved = LocalStorage.get(key);
		if (saved === null) LocalStorage.set(key, defaultValue);
		return saved !== null ? String(saved) : defaultValue;
	}
	return defaultValue;
}

function useLocalStorage(
	key: string,
	defaultValue: string
): [string, (newValue: string) => void] {

	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	function setItem(newValue: string) {
		localStorage.setItem(key, newValue);
		setValue(newValue);
		window.location.reload();
	}

	return [value, setItem];
}
export default useLocalStorage;
