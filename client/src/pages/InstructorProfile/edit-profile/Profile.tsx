import useSearchQuery from './fetchApi';
import { updateProfile } from './updateApi';

import ProfileForm from './ProfileForm';

import { InstructorData } from './types';

import Form from '@/components/form/Form';
import { UseUser } from '@/store/userStore';

export default function Profile() {
  const user = UseUser();
  const instructorId = user?._id;

  const { isLoading, isError, data } = useSearchQuery(instructorId as string);
  const verifiedData = data?.data?.data;

  async function submitAction(instructorData: InstructorData) {
    await updateProfile(instructorId as string, instructorData);
  }
  if (isError)
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course information.
      </h1>
    );
  if (isLoading) return <div className='text-info text-center'>Loading...</div>;

  if (!data) return <></>;

  const initialValues = {
    name: verifiedData?.name,
    email: { address: verifiedData?.email?.address },
    phone: verifiedData?.phone,
    username: verifiedData?.username,
    biography: verifiedData?.biography
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
