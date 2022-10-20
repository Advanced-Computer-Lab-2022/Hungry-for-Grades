import styles from './loader.module.css';
function Loader() {
  return (
    <div className=''>
      <div className={styles.spinner}>
        <div className={styles['bar-1']} />
        <div className={styles['bar-3']} />
        <div className={styles['bar-5']} />
        <div className={styles['bar-7']} />
        <div className={styles['bar-9']} />
        <div className={styles['bar-11']} />
        <div className={styles['bar-13']} />
        <div className={styles['bar-15']} />
      </div>
    </div>
  );
}

export default Loader;
