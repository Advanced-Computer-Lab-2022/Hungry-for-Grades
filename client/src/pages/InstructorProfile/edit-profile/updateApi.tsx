import axios, { AxiosResponse } from 'axios';

import { InstructorData } from './types';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export async function updateProfile(
  instructorId: string,
  instructorData: InstructorData
): Promise<IInstructor> {
  const res: AxiosResponse<HttpResponse<IInstructor>> = await axios.patch(
    `${APP_BASE_API_URL}/instructor/${encodeURIComponent(instructorId)}`,
    instructorData
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
