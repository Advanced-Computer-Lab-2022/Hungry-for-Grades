
import {FaLock, FaEnvelope} from 'react-icons/fa';


import * as Yup from 'yup';

import { Formik } from 'formik';


// eslint-disable-next-line css-modules/no-unused-class
import styles from './AddAdmin.module.scss';

import TextArea from './TextArea';

export default function AddAdmin() {

    

    const validate = Yup.object({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 charaters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password must match')
          .required('Confirm password is required'),
      })

  return (
    <Formik
          initialValues={{
              email: '',
              password: '',
              confirmPassword: ''
          }} 
          validationSchema={validate} 
          onSubmit={function (values: { email: string; password: string; confirmPassword: string;})
            {
                console.log(values);
            } 
        }
    >
        {
            function(formik){
                return(
        <div className={styles.form_wrapper}>
  <div className={styles.form_container}>
    <div className={styles.title_container}>
      <h2>Register a new Admin</h2>
    </div>
    <div className={`row ${styles.clearfix||''}`}>
      <div className="">
        <form action = "www.google.com">
          <div className={styles.input_field}> <span><FaEnvelope /></span>
            <TextArea name="email" placeholder="Email" type="email" />
          </div>
          <div className={styles.input_field}><span> <FaLock /> </span>
            <TextArea name="password" placeholder="Password" type="password" />
          </div>
          <div className={styles.input_field}> <span> <FaLock /> </span>
            <TextArea name="confirmPassword" placeholder="Re-type Password" type="password" />
          </div>
          <input className = "button" type="submit" />
        </form>
      </div>
    </div>
  </div>
</div>
                );
            }
}
    </Formik>
  )
}
