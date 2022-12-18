

import styles from './reportsTable.module.scss';

import useGetReports from './useGetReports';

import Loader from '@/components/loader/loaderpage/Loader';
import { AllReport, Reason } from '@/interfaces/reports.interface';
import { IUser } from '@/interfaces/user.interface';
import { UseUser } from '@/store/userStore';



export default function ReportsTable() {

    const user = UseUser();

    const {data, isLoading} = useGetReports(user as IUser);

    if(isLoading)
    {
        return <Loader />;
    }

    const arr = data?.data?.data;

    const toShow = arr?.map((report : AllReport) => {
        const date = report?.createdAt.toString().substring(0, 10);;
        return(
            <tr
        key={report?._id}
        style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
      >
        <td>{report?.reason}</td>
        <td>{(report?._course != null)? report?._course.at(0)?.title: 'None'}</td>
        <td>{date}</td>
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
            <div className={`alert alert-danger mt-3 ${styles.statusRej || ''}`}>Rejected</div>
          </td>
        )}
      </tr>

        );
    })


  return (
    <div
        style={{ backgroundColor: '#F5F7F8', width: '100%', height: '100%' }}
    >
    <div
          style={{
            marginLeft: '3rem',
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#A00407',
            display: 'inline-block',
            marginTop: '2rem'
          }}
        >
          Reports
    </div>
    <div style={{ marginLeft: '3rem', marginTop: '1.5rem' }}>
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.container}>
        <thead>
          <tr
            style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
          >
            <th>Reason</th>
            <th>Course</th>
            <th>Date</th>
            <th style={{ paddingLeft: '0.5rem' }}>Status</th>
          </tr>
        </thead>
        <tbody>{toShow}</tbody>
      </table>
    </div>
    </div>
    </div>
  )
}
