import { updateProfile } from './updateApi';

import ProfileForm from './ProfileForm';

import { InstructorData } from './types';

import Form from '@/components/form/Form';
import { UseUser } from '@/store/userStore';

export default function Profile() {
  const user = UseUser();
  const instructorId = user?._id;

  async function submitAction(instructorData: InstructorData) {
    await updateProfile(instructorId as string, instructorData);
  }

  const initialValues = {
    name: user?.name,
    email: { address: user?.email?.address },
    phone: user?.phone,
    username: user?.username,
    biography: user?.biography
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
