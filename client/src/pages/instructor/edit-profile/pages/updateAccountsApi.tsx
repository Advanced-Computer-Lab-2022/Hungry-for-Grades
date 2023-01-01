import { AxiosResponse } from 'axios';

import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { patchRequest } from '@/services/axios/http-verbs';

type AccountsData = {
  facebook: string | '';
  youtube: string | '';
  linkedin: string | '';
  personalWebsite: string | '';
  github: string | '';
};

export function updateProfile(
  instructorId: string,
  instructorData: AccountsData
) {
  const data = {
    socialMedia: {
      facebook: instructorData.facebook,
      youtube: instructorData.youtube,
      linkedin: instructorData.linkedin,
      personalWebsite: instructorData.personalWebsite,
      github: instructorData.github
    }
  };
  const instructor = InstructorRoutes.PATCH.updateProfile;
  instructor.URL = `/instructor/${encodeURIComponent(instructorId)}`;
  instructor.payload = data;
  return patchRequest<AxiosResponse<HttpResponse<IInstructor>>>(instructor);
}

export default function usePatchQuery(
  instructorId: string,
  instructorData: AccountsData
) {
  return {
    ...useQuery(
      ['update-instructor-profile', instructorId, instructorData],
      () => updateProfile(instructorId, instructorData)
    )
  };
}
