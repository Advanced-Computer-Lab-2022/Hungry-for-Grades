import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@services/axios/http-verbs';

function usePostQuery() {
  return useMutation(postRequest, {
    cacheTime: 0,
    onError: error => {
      console.log(error);
      return error;
    },
    onSuccess: data => {
      console.log(data);
      return data;
    },
    retryDelay: 1000 // 1 second
  });
}

export default usePostQuery;
