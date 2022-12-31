import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './reportsTable.module.scss';

import useGetReports from './useGetReports';

import FollowModal from './FollowModal';

import Loader from '@/components/loader/loaderpage/Loader';
import { AllReport } from '@/interfaces/reports.interface';
import { IUser } from '@/interfaces/user.interface';
import { UseUser } from '@/store/userStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Pagination from '@/components/pagination/Pagination';

export default function ReportsTable() {
  const user = UseUser();

  const { data, isLoading, activePage, setActivePage } = useGetReports(
    user as IUser
  );

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);

  const arr = data?.data?.data;

  const [curr, setCurr] = useState<AllReport>(arr?.[0] as AllReport);

  function handleClick(id : string) {
   // setShowModal(!showModal);
   navigate(`../followup/${id}?trainee=true`);
   //navigate('../payment-accepted?walletUsed=true');
  }

  if (isLoading) {
    return <Loader />;
  }

  if (arr == undefined) return <ErrorMessage />;

  const toShow = arr?.map((report: AllReport, index) => {
    const date = report?.createdAt.toString().substring(0, 10);
    return (
      <>
        <tr
          key={report?._id}
          style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
        >
          <td>{index + 1}</td>

          <td>{report?.reason}</td>
          <td className='text-truncate'>
            {report?._course != null ? report?._course.at(0)?.title : 'None'}
          </td>
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
              <div
                className={`alert alert-danger mt-3 ${styles.statusRej || ''}`}
              >
                Rejected
              </div>
            </td>
          )}
          <td>
            <button
              style={{ fontSize: '1rem', color: '#A00407' }}
              type='button'
              onClick={() => {
                handleClick(report?._id);
                setCurr(report);
              }}
            >
              Follow Ups
            </button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className=' py-5' style={{ backgroundColor: '#F5F7F8' }}>
      <div
        className='container'
        style={{
          marginLeft: '3rem',
          fontSize: '1.4rem',
          fontWeight: '500',
          color: '#A00407',
          display: 'inline-block'
        }}
      >
        Reports
      </div>
      <div
        className='p-5'
        style={{
          marginLeft: '3rem'
        }}
      >
        <div className='table-responsive'>
          <table
            className={`${styles.container ?? ''} table`}
            style={{
              filter: 'drop-shadow(0 0 0.1rem #eee)',
              borderRadius: '0.25rem',
              boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)'
            }}
          >
            <thead>
              <tr
                style={{
                  fontWeight: '600',
                  fontSize: '1rem',
                  paddingLeft: '1rem'
                }}
              >
                <th>#</th>

                <th>Reason</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th> &nbsp; &nbsp; Follow Ups</th>
              </tr>
            </thead>
            <tbody>
              <>
              {toShow}
              {showModal && <FollowModal func={handleClick} report={curr} />}
              </>
            </tbody>
          </table>
        </div>
        {data?.data?.totalPages != undefined && data?.data?.totalPages > 1 &&
        <Pagination
          activePage={activePage}
          pages={data?.data?.totalPages}
          setActivePage={setActivePage}
        />
        }
      </div>
    </div>
  );
}
