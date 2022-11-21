import { BsSearch } from 'react-icons/bs';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <div style={{ width: '50%', marginLeft: '0', marginRight: '3%' }}>
      <div className={styles.bar}>
        <BsSearch
          style={{
            color: 'grey',
            fontSize: '20px',
            marginLeft: '0.8rem',
            width: '5%'
          }}
        />
        <input
          className={styles.actual}
          placeholder='Search for anything'
          type='text'
        />
      </div>
    </div>
  );
}
