import axios, { AxiosResponse } from 'axios';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

type AccountsData = {
  facebook: string | '';
  youtube: string | '';
  linkedin: string | '';
  personalWebsite: string | '';
  github: string | '';
};

export async function updateProfile(
  instructorId: string,
  instructorData: AccountsData
): Promise<AxiosResponse<HttpResponse<IInstructor>>> {
  const data = {
    socialMedia: {
      facebook: instructorData.facebook,
      youtube: instructorData.youtube,
      linkedin: instructorData.linkedin,
      personalWebsite: instructorData.personalWebsite,
      github: instructorData.github
    }
  };
  return axios.patch(
    `${APP_BASE_API_URL}/instructor/${encodeURIComponent(instructorId)}`,
    data
  );
}
