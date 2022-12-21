import { MdIndeterminateCheckBox } from 'react-icons/md';

import { toast } from 'react-toastify';

import styles from './RefundTable.module.scss';

import { toastOptions } from '@/components/toast/options';
import usePatchQuery from '@/hooks/usePatchQuery';
import { AllReport, Status } from '@/interfaces/reports.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { PaymentRoutes } from '@/services/axios/dataServices/PaymenrDataService';
import usePostQuery from '@/hooks/usePostQuery';

export default function RefundTable(props: {
  data: AllReport[];
  st: Set<AllReport>;
  funA: (x: AllReport) => void;
  funR: (x: AllReport) => void;
  updateTable: (x: number) => void;
  num: number;
}) {
  const { mutateAsync: makeTheRefund } = usePostQuery();

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

    const Reffund = PaymentRoutes.POST.Refund;

    Reffund.URL = `/payment/refund/trainee/${
      report?.traineeInfo?.at(0)?._id as string
    }/course/${report?._course?.at(0)?._id as string}`;

    await makeTheRefund(Reffund);

    toast.success('Actions are applied successfully...', toastOptions);

    props?.updateTable(props?.num + 1);
  }

  let i = -1;

  const toShow = props?.data?.map((report: AllReport) => {
    i++;
    const isDisabled = report?.status == Status.PENDING ? false : true;
    return (
      <tr
        key={report?._id}
        style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
      >
        <td>
          <input
            disabled={isDisabled}
            id={'CheckBox' + (138191 * 10501 + -10 + 1912 + i).toString()}
            style={{
              width: '1.4rem',
              height: '1.2rem',
              alignItems: 'center',
              marginTop: '1rem',
              marginLeft: '0.1rem'
            }}
            type='checkbox'
            onClick={() => handleMultipleRows(report)}
          />
        </td>
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
            <button
              className={styles.aprove}
              type='button'
              onClick={() => handleAction(Status?.RESOLVED, report)}
            >
              Accept
            </button>
            <button
              className={styles.decline}
              type='button'
              onClick={() => handleAction(Status?.REJECTED, report)}
            >
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
        <thead>
          <tr
            style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
          >
            <th>
              <MdIndeterminateCheckBox
                style={{ color: '#DC3535', fontSize: '1.5rem' }}
              />
            </th>
            <th>Trainee</th>
            <th>Course To Refund</th>
            <th>Date</th>
            <th style={{ paddingLeft: '0.5rem' }}>Status</th>
            <th style={{ paddingLeft: '3rem' }}>Actions</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>{toShow}</tbody>
      </table>
    </div>
  );
}
