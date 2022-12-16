import useSearchQuery from './fetchApi';
import { updateProfile } from './updateApi';

import ProfileForm from './ProfileForm';

import { TraineeData } from './types';

import Form from '@/components/form/Form';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';

export default function Profile() {
  const traineeId = '637969352c3f71696ca34759';

  const { isLoading, isError, data } = useSearchQuery();
  const verifiedData = data?.data?.data;

  async function submitAction(traineeData: TraineeData) {
    console.log('was here 1');
    await updateProfile(traineeId, traineeData);
  }
  if (isError) return <ErrorMessage />;
  if (isLoading) return <LoaderComponent />;

  if (!data) return <></>;

  const initialValues = {
    name: verifiedData?.name,
    email: { address: verifiedData?.email.address },
    phone: verifiedData?.phone,
    username: verifiedData?.username
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
