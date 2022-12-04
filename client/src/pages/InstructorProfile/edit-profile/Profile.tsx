import useSearchQuery from './fetchApi';
import { updateProfile } from './updateApi';

import ProfileForm from './ProfileForm';

import Form from '@/components/form/Form';

export default function Profile() {
  const instructorId = '637a2160a0fc7dcfe39b4931';

  const { isLoading, isError, data } = useSearchQuery();
  const verifiedData = data?.data?.data;
  console.log(verifiedData);

  async function submitAction(instructorData: any) {
    console.log('was here 1');
    await updateProfile(instructorId, instructorData);
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
    name: verifiedData.name,
    email: { address: verifiedData.email.address },
    phone: verifiedData.phone,
    username: verifiedData.username,
    biography: verifiedData.biography
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
