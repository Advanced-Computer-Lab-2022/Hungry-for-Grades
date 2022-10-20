import { BiErrorCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

import styles from './error.module.css';

type ErrorProps = {
  type: number;
};
function Error({ type }: ErrorProps) {
  return (
    <div className={styles['error-container']}>
      {type === 404 && (
        <>
          <BiErrorCircle className={styles.icon} />
          <h1>Page Not Found</h1>
          <p>Sorry, but the page you were trying to view does not exist.</p>
        </>
      )}

      {type === 400 && (
        <>
          <FiSettings className={styles.icon} />
          <h1>Bad Request</h1>
          <p>Sorry,This page isn&apos;t working at the moment.</p>
        </>
      )}
    </div>
  );
}

export default Error;
