import { MdIndeterminateCheckBox } from 'react-icons/md';

// NEED TO BE REVISED
// eslint-disable-next-line css-modules/no-unused-class
import { toast } from 'react-toastify';

import styles from './table.module.scss';

import { AllReport, Status } from '@/interfaces/reports.interface';
import usePatchQuery from '@/hooks/usePatchQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { toastOptions } from '@/components/toast/options';

export default function AdminHome(props: {
  data: AllReport[];
  st: Set<AllReport>;
  funA: (x: AllReport) => void;
  funR: (x: AllReport) => void;
  updateTable: (x: number) => void;
  num: number;
}) {
  function handleMultipleRows(report: AllReport) {
    if (props?.st.has(report)) {
      //then we are removing it now
      props?.funR(report);
    } else {
      props?.funA(report);
    }
  }

  const { mutateAsync: updateReport } = usePatchQuery();

  async function handleAction(status: Status, report: AllReport) {
    const Rep = ReportDataService.PATCH.updateReport;

    Rep.URL = `/report/${report?._id}`;

    Rep.payload = {
      status: status
    };

    props?.funR(report);

    await updateReport(Rep);

    toast.success('Actions are applied successfully...', toastOptions);

    props?.updateTable(props?.num + 1);
  }

  let i = 0;
  const toShow =
    props.data && props.data?.length ? (
      props.data?.map((report: AllReport) => {
        i++;
        const isDisabled = report?.status == 'Pending' ? false : true;
        const reportDate = report?.createdAt?.toString().substring(0, 10);
        return (
          <tr
            key={report?._id}
            style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
          >
            <td>
              <input
                className={
                  report?.status == 'Resolved' || report?.status == 'Rejected'
                    ? ''
                    : 'form-check-input'
                }
                disabled={isDisabled}
                id={'CheckBox' + (138191 * 10501 + -10 + 1912 + i).toString()}
                style={{
                  width: '1.4rem',
                  height: '1.2rem',
                  alignItems: 'center',
                  //here was marginTop 1rem
                  marginLeft: '0.1rem'
                }}
                type='checkbox'
                onClick={() => handleMultipleRows(report)}
              />
            </td>
            <td>{report?.traineeInfo.at(0)?.name}</td>
            <td>{report?._course.at(0)?.title}</td>
            <td>{reportDate}</td>
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
            {report?.status == Status.UNSEEN && (
              <td>
                <div className={styles.statusUnseen}>Unseen</div>
              </td>
            )}
            {(report?.status == 'Resolved' || report?.status == 'Rejected') && (
              <td>No Actions Required</td>
            )}
            {!(
              report?.status == 'Resolved' || report?.status == 'Rejected'
            ) && (
              <td>
                <button
                  className='btn btn-outline-primary mx-2'
                  type='button'
                  onClick={() => handleAction(Status?.RESOLVED, report)}
                >
                  Accept
                </button>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={() => handleAction(Status?.REJECTED, report)}
                >
                  Decline
                </button>
                {report?.status == Status.UNSEEN && (
                  <button
                    className={styles.aprove}
                    type='button'
                    onClick={() => handleAction(Status?.PENDING, report)}
                  >
                    Mark as Pending
                  </button>
                )}
              </td>
            )}
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={6} style={{ textAlign: 'center' }}>
          No Course Requests Found
        </td>
      </tr>
    );

  return (
    <div className='pb-5'>
      <div className='table-responsive'>
        <table className={`${styles.container ?? 'table'}`}>
          <thead>
            <tr
              style={{
                fontWeight: '600',
                fontSize: '1rem',
                paddingLeft: '1rem'
              }}
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
          </thead>
          <tbody>{toShow}</tbody>
        </table>
      </div>
    </div>
  );
}
