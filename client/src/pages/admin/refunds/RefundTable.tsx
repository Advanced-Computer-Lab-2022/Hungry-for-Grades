import { toast } from 'react-toastify';

import { useState } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
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
  clearSet: () => void;
}) {
  const [all, setAll] = useState<boolean>(false);

  const { mutateAsync: makeTheRefund } = usePostQuery();

  function handleMultipleRows(report: AllReport) {
    if (props?.st.has(report)) {
      //then we are removing it now
      props?.funR(report);
    } else {
      props?.funA(report);
    }
  }

  function SelectAll() {
    if (!all) {
      for (let i = 0; i < props?.data?.length; ++i) {
        if (
          props?.data[i]?.status != Status.REJECTED &&
          props?.data[i]?.status != Status.RESOLVED
        )
          props?.funA(props?.data[i] as AllReport);
      }
    } else {
      props?.clearSet();
    }
    setAll(!all);
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
    const reportDate = report?.createdAt?.toString().substring(0, 10);
    const styleContent = 'fit-content';
    return (
      <tr
        key={report?._id}
        style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
      >
        <td>
          <input
            checked={(all || props?.st?.has(report)) && !isDisabled}
            disabled={isDisabled}
            id={'CheckBox' + (138191 * 10501 + -10 + 1912 + i).toString()}
            style={{
              width: '1.4rem',
              height: '1.2rem',
              alignItems: 'center',
              //Here was marginTop 1rem
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
        {(report?.status == 'Resolved' || report?.status == 'Rejected') && (
          <td style={{ textAlign: 'center' }}>No Actions Required</td>
        )}
        {!(report?.status == 'Resolved' || report?.status == 'Rejected') && (
          <td className='col' style={{ textAlign: 'center' }}>
            <button
              className='btn btn-outline-primary mx-2'
              style={{ textAlign: 'center' }}
              type='button'
              onClick={() => handleAction(Status?.RESOLVED, report)}
            >
              Accept
            </button>
            <button
              className='btn btn-primary mx-2'
              style={{ textAlign: 'center' }}
              type='button'
              onClick={() => handleAction(Status?.REJECTED, report)}
            >
              Decline
            </button>
            {report?.status == Status.UNSEEN && (
              <button
                className='btn btn-secondary'
                style={{ textAlign: 'center' }}
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
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.container}>
        <thead>
          <tr
            style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
          >
            <th>
              <input
                checked={all}
                className='form-check-input'
                style={{
                  width: '1.4rem',
                  height: '1.2rem',
                  alignItems: 'center',
                  //here was marginTop 1rem
                  marginLeft: '0.1rem'
                }}
                type='checkbox'
                onClick={() => SelectAll()}
              />
            </th>
            <th>Trainee</th>
            <th>Course To Refund</th>
            <th>Date</th>
            <th style={{ paddingLeft: '0.5rem' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>{toShow}</tbody>
      </table>
    </div>
  );
}
