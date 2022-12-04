import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import setupInterceptorsTo from './http-interceptors';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

const http = setupInterceptorsTo(
  axios.create({
    baseURL: `${APP_BASE_API_URL}`,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
);

const httpProtected = setupInterceptorsTo(
  axios.create({
    baseURL: `${APP_BASE_API_URL}`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
);

/* http.interceptors.response.use(
	onResponse,
	onResponseError
)

http.interceptors.request.use(
	onRequest,
	onRequestError
)
 */
async function getCSRFToken() {
  const response = await http.get<{ CSRFToken: string }>('/getCSRFToken');
  http.defaults.headers.post['X-CSRF-Token'] = response?.data?.CSRFToken;
}

export { getCSRFToken, httpProtected, http };
