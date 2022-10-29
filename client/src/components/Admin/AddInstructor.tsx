
import {FaLock, FaEnvelope} from 'react-icons/fa';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './AddAdmin.module.scss';

export default function AddInstructor() {
  return (
    <div className={styles.form_wrapper}>
  <div className={styles.form_container}>
    <div className={styles.title_container}>
      <h2>Register an Instructor</h2>
    </div>
    <div className={`row ${styles.clearfix||''}`}>
      <div className="">
        <form>
          <div className={styles.input_field}> <span><FaEnvelope /></span>
            <input required name="email" placeholder="Email" type="email" />
          </div>
          <div className={styles.input_field}><span> <FaLock /> </span>
            <input required name="password" placeholder="Password" type="password" />
          </div>
          <div className={styles.input_field}> <span> <FaLock /> </span>
            <input required name="password" placeholder="Re-type Password" type="password" />
          </div>
          <input className="button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  </div>
</div>
  )
}
