import { useEffect, useState } from 'react';

import LocalStorage from '@/services/localStorage/LocalStorage';
function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = LocalStorage.get<T>(key);
		if (jsonValue == null) {
			if (typeof initialValue === 'function') {
				return (initialValue as () => T)();
			} else {
				return initialValue ;
			}
		} else {
			return jsonValue as T;
		}
	});

	useEffect(() => {
		LocalStorage.set(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as [T, typeof setValue];
}

export default useLocalStorage;
