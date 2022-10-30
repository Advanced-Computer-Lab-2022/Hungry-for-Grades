import { ErrorMessage, useField } from 'formik';

import styles from './TextArea.module.scss';

export default function TextArea(props: {
  name: string;
  placeholder: string;
  type: string;
}) {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        className={`
        ${(styles.textArea, (meta.error && meta.touched && 'is-invalid') || '')}
        `}
        {...field}
        {...props}
        autoComplete='off'
      />
      <ErrorMessage
        className={styles.error}
        component='div'
        name={field.name}
      />
    </>
  );
}
