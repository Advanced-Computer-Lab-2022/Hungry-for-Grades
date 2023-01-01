import { useState } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './reportsTable.module.scss';

import useGetReports from './useGetReports';

import FollowUp from '@pages/trainee/followUps/FollowUp';

import Loader from '@/components/loader/loaderpage/Loader';
import { AllReport, Status } from '@/interfaces/reports.interface';
import { IUser } from '@/interfaces/user.interface';
import { UseUser } from '@/store/userStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Pagination from '@/components/pagination/Pagination';

export default function ReportsTable() {
  const user = UseUser();

  const { data, isLoading, activePage, setActivePage } = useGetReports(
    user as IUser
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const arr = data?.data?.data;

  const [curr, setCurr] = useState<AllReport>(null as unknown as AllReport);

  function handleClick() {
    setShowModal(!showModal);
    //navigate(`../followup/${id}?trainee=true`);
    //navigate('../payment-accepted?walletUsed=true');
  }

  if (isLoading) {
    return <Loader />;
  }

  if (arr == undefined) return <ErrorMessage />;

  console.log(arr);

  const toShow =
    arr != undefined ? (
      arr?.map((report: AllReport, index) => {
        const styleContent = 'fit-content';
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
                {report?._course[0] != null
                  ? report?._course.at(0)?.title
                  : 'General Report'}
              </td>
              <td>{date}</td>
              {report?.status == 'Resolved' && (
                <td>
                  <div
                    className='alert alert-success'
                    style={{
                      textAlign: 'center',
                      width: styleContent,
                      height: styleContent,
                      padding: '0.5rem',
                      border: '1px solid'
                    }}
                  >
                    Resolved
                  </div>
                </td>
              )}
              {report?.status == 'Pending' && (
                <td>
                  <div
                    className='alert alert-warning'
                    style={{
                      textAlign: 'center',
                      width: styleContent,
                      height: styleContent,
                      padding: '0.5rem',
                      border: '1px solid'
                    }}
                  >
                    Pending
                  </div>
                </td>
              )}
              {report?.status == 'Rejected' && (
                <td>
                  <div
                    className='alert alert-danger'
                    style={{
                      textAlign: 'center',
                      width: styleContent,
                      height: styleContent,
                      padding: '0.5rem',
                      border: '1px solid'
                    }}
                  >
                    Rejected
                  </div>
                </td>
              )}
              {report?.status == Status.UNSEEN && (
                <td>
                  <div
                    className='alert alert-info'
                    style={{
                      textAlign: 'center',
                      width: styleContent,
                      height: styleContent,
                      padding: '0.5rem',
                      border: '1px solid'
                    }}
                  >
                    Unseen
                  </div>
                </td>
              )}
              <td>
                <button
                  style={{ fontSize: '1rem', color: '#A00407' }}
                  type='button'
                  onClick={() => {
                    setCurr(report);
                    handleClick();
                  }}
                >
                  Follow Ups
                </button>
              </td>
            </tr>
          </>
        );
      })
    ) : (
      <tr>
        <td className='text-center' colSpan={6}>
          No Reports
        </td>
      </tr>
    );

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
                {showModal && (
                  <FollowUp func={handleClick} report={curr} trainee={'true'} />
                )}
              </>
            </tbody>
          </table>
        </div>
        {data?.data?.totalPages != undefined && data?.data?.totalPages > 1 && (
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </div>
  );
}
