import { useFormik } from 'formik';
import * as Yup from 'yup';

function useValidation() {
  const formik = useFormik<{
    subject: string;
    body: string;
  }>({
    initialValues: {
      subject: '',
      body: ''
    },
    validationSchema: Yup.object({
      subject: Yup.string()
        .min(6, 'Subject Too Short!')
        .max(50, 'Subject Too Long!')
        .required('Subject is Required'),
      body: Yup.string()
        .min(6, 'Body Too Short!')
        .max(50, 'Body Too Long!')
        .required('Body is Required')
    }),
    onSubmit: (_, actions) => {
      actions.resetForm();
      actions.setSubmitting(true);
    }
  });
  return {
    formik
  };
}
export type ReportFormProps = {
  reason: string;
  description: string;
};

export default useValidation;
