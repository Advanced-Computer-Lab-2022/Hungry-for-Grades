import { MdIndeterminateCheckBox } from 'react-icons/md';

// NEED TO BE REVISED
// eslint-disable-next-line css-modules/no-unused-class
import styles from './table.module.scss';

import { AllReport } from '@/interfaces/reports.interface';

export default function AdminHome(props: { data: AllReport[] }) {
  const toShow = props.data?.map((report: AllReport) => {
    return (
      <tr
        key={report?._id}
        style={{ fontSize: '1rem', fontWeight: '400', color: '#393E46' }}
      >
        <input
          id={'HusseinChecker'}
          style={{
            width: '1.4rem',
            height: '1.2rem',
            alignItems: 'center',
            marginTop: '1rem',
            marginLeft: '0.1rem'
          }}
          type='checkbox'
        />
        <td>{report?.traineeInfo.at(0)?.name}</td>
        <td>{report?._course.at(0)?.title}</td>
        <td>15/04/2001</td>
        {report?.status == 'Pending' && (
          <td>
            <div className={styles.statusP}>Pending</div>
          </td>
        )}
        {report?.status == 'Resolved' && (
          <td>
            <div className={styles.statusResolved}>Resolved</div>
          </td>
        )}
        {report?.status == 'Rejected' && (
          <td>
            <div className={styles.statusRej}>Rejected</div>
          </td>
        )}
        {(report?.status == 'Resolved' || report?.status == 'Rejected') && (
          <td>No Actions Required</td>
        )}
        {!(report?.status == 'Resolved' || report?.status == 'Rejected') && (
          <td>
            <button className={styles.aprove} type='button'>
              Accept
            </button>
            <button className={styles.decline} type='button'>
              Decline
            </button>
          </td>
        )}
      </tr>
    );
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.container}>
        <tr
          style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
        >
          <th>
            <MdIndeterminateCheckBox
              style={{ color: '#DC3535', fontSize: '1.5rem' }}
            />
          </th>
          <th>Corporate Trainee</th>
          <th>Requested Course</th>
          <th>Date</th>
          <th style={{ paddingLeft: '0.5rem' }}>Status</th>
          <th style={{ paddingLeft: '3rem' }}>Actions</th>
        </tr>
        {toShow}
      </table>
    </div>
  );
}
