import { AxiosResponse } from 'axios';

import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { patchRequest } from '@/services/axios/http-verbs';

type EditProfileData = {
  profileImage: string | undefined;
  name: string | undefined;
  biography: string | undefined;
  email: string | undefined;
  username: string | undefined;
  phone: string | undefined;
};

export function updateProfile(
  instructorId: string,
  instructorData: EditProfileData
) {
  const data = {
    profileImage: instructorData.profileImage,
    name: instructorData.name,
    email: { address: instructorData.email },
    phone: instructorData.phone,
    username: instructorData.username,
    biography: instructorData.biography
  };
  const instructor = InstructorRoutes.PATCH.updateProfile;
  instructor.URL = `/instructor/${encodeURIComponent(instructorId)}`;
  instructor.payload = data;
  return patchRequest<AxiosResponse<HttpResponse<IInstructor>>>(instructor);
}

export default function usePatchQuery(
  instructorId: string,
  instructorData: EditProfileData
) {
  return {
    ...useQuery(
      ['update-instructor-profile', instructorId, instructorData],
      () => updateProfile(instructorId, instructorData)
    )
  };
}
