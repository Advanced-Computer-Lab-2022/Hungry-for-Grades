/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export async function updateProfile(traineeId: string, traineeData: any) {
  const res = await axios.patch(
    `${APP_BASE_API_URL}/trainee/${traineeId}`,
    traineeData
  );
  if (res.statusText !== 'Updated') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
