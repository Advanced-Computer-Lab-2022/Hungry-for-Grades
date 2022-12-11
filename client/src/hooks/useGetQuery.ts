import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@services/axios/http-verbs';

function useGetQuery<T>(name: string, dependencies: unknown[]) {
	return useQuery([name, ...dependencies], getRequest<T>, {
		cacheTime: 1000 * 60 * 60 * 24 // 1 day
	});
}

export default useGetQuery;
