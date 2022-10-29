import { ErrorMessage, useField } from 'formik';

import styles from './TextArea.module.scss'


export default function TextArea({...probs}) {

    const [field, meta] = useField(probs);

  return (
    <>
       <input
        className={`
        ${styles.textArea, meta.error && meta.touched && 'is-invalid'}
        `}
        {...field} 
        {...probs}
        autoComplete="off"
      />
      <ErrorMessage className={styles.error} component="div" name={field.name} />
    </>
  )
}
