import { useFormik } from 'formik';
import * as Yup from 'yup';

function useValidation() {
  const formik = useFormik<ReportFormProps>({
    initialValues: {
      reason: '',
      description: ''
    },
    validationSchema: Yup.object({
      reason: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Reason is Required'),
      description: Yup.string()
        .min(6, 'Description Too Short!')
        .max(50, 'Description Too Long!')
        .required('Description is Required')
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
