import { useFormik } from 'formik';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './edit-profile.module.scss';
import { updateProfile } from './updateAccountsApi';

import { UseUser } from '@/store/userStore';
import { toastOptions } from '@/components/toast/options';

type AccountsData = {
  facebook: string | '';
  youtube: string | '';
  linkedin: string | '';
  personalWebsite: string | '';
  github: string | '';
};

const invalidURL = 'Invalid URL';

const validationSchema = Yup.object({
  facebook: Yup.string().url(invalidURL),
  youtube: Yup.string().url(invalidURL),
  linkedin: Yup.string().url(invalidURL),
  personalWebsite: Yup.string().url(invalidURL),
  github: Yup.string().url(invalidURL)
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Accounts() {
  const user = UseUser();

  async function submitAction(instructorData: AccountsData) {
    const response = await updateProfile(user?._id as string, instructorData);
    console.log(response);
    if (response.status === 200) {
      toast.success('Profile updated successfully', toastOptions);
    } else {
      toast.error('Error occurred while updating accounts', toastOptions);
    }
    console.log(response);
  }

  const initialValues = {
    facebook: user?.socialMedia?.facebook || '',
    youtube: user?.socialMedia?.youtube || '',
    linkedin: user?.socialMedia?.linkedin || '',
    personalWebsite: user?.socialMedia?.personalWebsite || '',
    github: user?.socialMedia?.github || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitAction,
    enableReinitialize: true
  });

  async function handleSubmit() {
    await formik.setTouched({
      facebook: true,
      youtube: true,
      linkedin: true,
      personalWebsite: true,
      github: true
    });
    void submitAction(formik.values); //need to be revised
  }

  return (
    <div className='row p-1'>
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Facebook</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your Facebook account link
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-facebook'
            name='facebook'
            placeholder='Facebook account link'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.facebook ? formik.values.facebook : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.facebook && formik.errors.facebook ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.facebook}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Youtube</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your Youtube account link
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-youtube'
            name='youtube'
            placeholder='Youtube account link'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.youtube ? formik.values.youtube : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.youtube && formik.errors.youtube ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.youtube}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Linkedin</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your Linkedin account link
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-linkedin'
            name='linkedin'
            placeholder='Linkedin account link'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.linkedin ? formik.values.linkedin : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.linkedin && formik.errors.linkedin ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.linkedin}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Personal website</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your personal website link
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-personal-website'
            name='personalWebsite'
            placeholder='Personal Website link'
            style={{ width: '100%' }}
            type='text'
            value={
              formik.values.personalWebsite ? formik.values.personalWebsite : ''
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.personalWebsite && formik.errors.personalWebsite ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.personalWebsite}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Github</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your github account link
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-github'
            name='github'
            placeholder='Github account link'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.github ? formik.values.github : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.github && formik.errors.github ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.github}
          </div>
        ) : null}
      </div>
      <button
        className='btn btn-primary mt-3 mx-auto'
        disabled={!formik.isValid}
        id='instructor-save-changes-accounts'
        style={{ width: '8rem' }}
        type='submit'
        onClick={handleSubmit}
      >
        Save Changes
      </button>
    </div>
  );
}
