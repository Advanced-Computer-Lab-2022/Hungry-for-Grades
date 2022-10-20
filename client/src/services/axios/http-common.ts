import axios from 'axios';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;
const TEMP_TOKEN = import.meta.env.VITE_TEMP_TOKEN;

const http = axios.create({
  baseURL: `${APP_BASE_API_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${TEMP_TOKEN}`
  }
});

async function getCSRFToken() {
  const response = await http.get<{ CSRFToken: string }>('/getCSRFToken');
  http.defaults.headers.post['X-CSRF-Token'] = response?.data?.CSRFToken;
}

export { getCSRFToken };
export default http;
