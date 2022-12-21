import { updateProfile } from './updateApi';

import ProfileForm from './ProfileForm';

import { TraineeData } from './types';

import Form from '@/components/form/Form';
import { UseUser } from '@/store/userStore';

export default function Profile() {
  const user = UseUser();
  const traineeId = user?._id;

  async function submitAction(traineeData: TraineeData) {
    await updateProfile(traineeId as string, traineeData);
  }

  const initialValues = {
    name: user?.name,
    email: { address: user?.email.address },
    phone: user?.phone,
    username: user?.username
  };

  return (
    <Form
      ariaLabel={''}
      disabled={false}
      encType={'application/x-www-form-urlencoded'}
      inputs={undefined}
      isError={false}
      isLoading={false}
      method={'post'}
    >
      {
        <ProfileForm
          initialValues={initialValues}
          submitAction={submitAction}
        />
      }
    </Form>
  );
}
