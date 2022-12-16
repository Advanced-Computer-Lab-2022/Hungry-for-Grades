import { useMutation } from '@tanstack/react-query';

import {  postRequest } from '@services/axios/http-verbs';

function usePostQuery<T>() {
  return useMutation(postRequest<T>, {
    cacheTime: 0,
    onSuccess: data => {
      return data;
    },
    retryDelay: 1000 // 1 second
  });
}


export default usePostQuery;
