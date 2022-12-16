import { useMutation } from '@tanstack/react-query';

import { patchRequest } from '@/services/axios/http-verbs';

function usePatchQuery<T>() {
  return useMutation(patchRequest<T>, {
    cacheTime: 0,
    onSuccess: data => {
      return data;
    },
    retryDelay: 1000 // 1 second
  });
}

export default usePatchQuery;
