import { AxiosResponse } from 'axios';

import { useQuery } from '@tanstack/react-query';

import { HttpResponse } from '@/interfaces/response.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { patchRequest } from '@/services/axios/http-verbs';
import { ITrainee } from '@/interfaces/course.interface';

type EditProfileData = {
  profileImage: string | undefined;
  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  phone: string | undefined;
};

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
  const res = await patchRequest<AxiosResponse<HttpResponse<ITrainee>>>(
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
    ...useQuery(['update-trainee-profile', traineeId, traineeData], () =>
      updateProfile(traineeId, traineeData)
    )
  };
}
