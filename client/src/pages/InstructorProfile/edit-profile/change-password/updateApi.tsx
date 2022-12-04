/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export async function updatePassword(data: any) {
  console.log('was here');
  // eslint-disable-next-line @typescript-eslint/return-await
  return await axios.post(`${APP_BASE_API_URL}/change-password`, data);
}
