import { AxiosResponse } from 'axios';

import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/interfaces/response.interface';
import { IInstructor } from '@/interfaces/instructor.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { patchRequest } from '@/services/axios/http-verbs';

type EditProfileData = {
  profileImage: string | undefined;
  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  phone: string | undefined;
};
//AxiosResponse<HttpResponse<IInstructor>>

export async function updateProfile(
  traineeId: string,
  traineeData: EditProfileData
) {
  const data = {
    profileImage: traineeData.profileImage,
    name: traineeData.name,
    email: { address: traineeData.email },
    phone: traineeData.phone,
    username: traineeData.username
  };
  const trainee = TraineeRoutes.PATCH.updateProfile;
  trainee.URL = `/trainee/${encodeURIComponent(traineeId)}`;
  trainee.payload = data;
  const res = await patchRequest<AxiosResponse<HttpResponse<IInstructor>>>(
    trainee
  );
  console.log(res);

  return res;
}

export default function usePatchQuery(
  traineeId: string,
  traineeData: EditProfileData
) {
  return {
    ...useQuery(['updateProfileee', traineeId, traineeData], () =>
      updateProfile(traineeId, traineeData)
    )
  };
}
