import axios, { AxiosResponse } from 'axios';

import { TraineeData } from './types';

import { HttpResponse } from '@/interfaces/response.interface';
import { ITrainee } from '@/interfaces/course.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export async function updateProfile(
  traineeId: string,
  traineeData: TraineeData
): Promise<ITrainee> {
  const res: AxiosResponse<HttpResponse<ITrainee>> = await axios.patch(
    `${APP_BASE_API_URL}/trainee/${encodeURIComponent(traineeId)}`,
    traineeData
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
