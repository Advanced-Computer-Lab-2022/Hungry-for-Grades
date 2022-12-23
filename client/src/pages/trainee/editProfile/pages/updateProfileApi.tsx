import axios, { AxiosResponse } from 'axios';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

type EditProfileData = {
  profileImage: string | undefined;
  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  phone: string | undefined;
};

export async function updateProfile(
  instructorId: string,
  instructorData: EditProfileData
): Promise<AxiosResponse<HttpResponse<IInstructor>>> {
  const data = {
    profileImage: instructorData.profileImage,
    name: instructorData.name,
    email: { address: instructorData.email },
    phone: instructorData.phone,
    username: instructorData.username
  };
  return axios.patch(
    `${APP_BASE_API_URL}/trainee/${encodeURIComponent(instructorId)}`,
    data
  );
}
