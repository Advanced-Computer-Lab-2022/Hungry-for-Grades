import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { toast } from 'react-toastify';

import { toastOptions } from '@components/toast/options';

type TokenType = {
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
};

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const unParsedToken = localStorage.getItem('token');
  if (unParsedToken) {
    // alert('problem');
    const { ACCESS_TOKEN } = JSON.parse(unParsedToken) as TokenType;

    if (ACCESS_TOKEN && config && config.headers) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      //toast.error('Internal Server Error', toastOptions);
      //Here i changed the position it was outside the if condition and we commented it because it was giving internal server error on interactions that are not needed
    }
  }

  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const { status } = error.response as AxiosResponse;
  switch (status) {
    case 401:
      history.pushState(
        {
          nextPath: window.location.pathname
        },
        '/auth/login'
      );
      toast.error('Unauthorized', toastOptions);
      break;
    case 403:
      toast.error('Forbidden access', toastOptions);
      break;
    case 404:
      toast.error('Page Not Found', toastOptions);
      break;
    case 500:
      history.pushState(
        {
          nextPath: window.location.pathname
        },
        '/auth/login'
      );
      toast.error('Internal Server', toastOptions);
      break;
    default:
      toast.error(error.message, toastOptions);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  /*   const unParsedToken = localStorage.getItem('token');
	if (
		error.response &&
		unParsedToken &&
		error.response.status === 401 &&
		error.response.data
		//error.response.data?.error !== null &&
		//error.response.data?.message === 'jwt expired'
	) {
		const { REFRESH_TOKEN } = JSON.parse(unParsedToken) as TokenType;

		try {
			const rs = await axios.post(`${APP_BASE_API_URL}/auth/refresh`, {
				REFRESH_TOKEN: REFRESH_TOKEN
			});

			const { token }: { token: string } = rs.data as { token: string };

			localStorage.setItem('token', JSON.stringify(token));
			//localStorage.setItem('user', JSON.stringify(user));
		} catch (_error) {
			return Promise.reject(_error);
		}
	} */

  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
