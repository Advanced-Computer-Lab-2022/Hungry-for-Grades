import styles from './TableHeader.module.scss';

export default function TableHeader() {
  return (
    <div className={styles.table_header} style={{ backgroundColor: '#F9F9F9' }}>
      <div>User Name</div>
      <div>Requested Course</div>
      <div>Date</div>
      <div>Status</div>
      <div>Action</div>
    </div>
  );
}
