import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';


import SessionStorage from '../sessionStorage/SessionStorage';

import { removeInfo } from '../savedInfo/SavedInfo';




import LocalStorage from '@/services/localStorage/LocalStorage';


const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

const loginRoute = '/auth/login';

let http: AxiosInstance;

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const accessToken = SessionStorage.get<string | null>('accessToken');

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;
    config.headers.Authorization = authorization;
  }
  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  // const { status } = error.response as AxiosResponse;
  /*
	switch (status) {
		case 401:
			LocalStorage.remove('_TOKEN');
			SessionStorage.remove('accessToken');
			window.location.replace(loginRoute);
			toast.error('Unauthorized', toastOptions);
			break;
		case 403:
			toast.error('Forbidden access', toastOptions);
			break;
		case 404:
			toast.error('Page Not Found', toastOptions);
			break;
		case 500:
			window.location.replace(loginRoute);
			toast.error('Internal Server', toastOptions);
			break;
		default:
			toast.error(error.message, toastOptions);
	} */
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

async function onResponseError(error: AxiosError): Promise<AxiosError> {
  const rememberMe = LocalStorage.get('rememberMe');
  console.log(error);



  if (
    error.response &&
    error.response.status === 401 &&
    error.response.data

    //error.response.data?.error !== null &&
    //error.response.data?.message === 'jwt expired'
  ) {
    try {
      const prevRequest = error.config;
      if (prevRequest && !prevRequest?.sent && rememberMe) {
        prevRequest.sent = true;

        const res = await axios.get(`${APP_BASE_API_URL}/refresh`, {
          withCredentials: true
        });
        const { accessToken }: { accessToken: string } = res.data.data as {
          accessToken: string;
        };
        SessionStorage.set<string>('accessToken', accessToken);
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        window.location.reload();
        await http(prevRequest);
      } else {
        removeInfo();
        window.location.replace(loginRoute);
        return await Promise.reject(error);
      }
    } catch (_error) {
      removeInfo();

      window.location.replace(loginRoute);


      return Promise.reject(_error);
    }
  }

  return Promise.resolve(error);
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  http = axiosInstance;
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
export default setupInterceptorsTo;
