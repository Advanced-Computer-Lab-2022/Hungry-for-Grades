import { MdIndeterminateCheckBox } from 'react-icons/md';

// NEED TO BE REVISED
// eslint-disable-next-line css-modules/no-unused-class
import { toast } from 'react-toastify';

import { HiOutlineDocumentReport } from 'react-icons/hi';

import { useState } from 'react';

import DescriptionModal from '../reportRequests/DescriptionModal';

import styles from './AdminTable2.module.scss';

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
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const [description, setDescription] = useState('');

  function closeModal() {
    setShowDescription(false);
  }

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
  const toShow = props.data?.map((report: AllReport) => {
    i++;
    const isDisabled = report?.status == 'Pending' ? false : true;
    return (
      <tr
        key={report?._id}
        style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
      >
        <td>
          <input
            disabled={isDisabled}
            id={
              'CheckBox' +
              (1381124191 * 1050510891 + -10 + 1124912 + i * i).toString()
            }
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
        <td>{report?.reason}</td>
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
              Mark as Resolved
            </button>
          </td>
        )}
        <td>
          {report?.description != '' && (
            <button
              style={{ border: 'none' }}
              type='button'
              onClick={() => {
                setShowDescription(true);
                setDescription(report?.description);
              }}
            >
              <HiOutlineDocumentReport className={styles.report_description} />
            </button>
          )}
          {report?.description == '' && 'No Description'}
        </td>
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
            <th>User</th>
            <th>Report Type</th>
            <th>Date</th>
            <th style={{ paddingLeft: '0.5rem' }}>Status</th>
            <th style={{ paddingLeft: '3rem' }}>Actions</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {toShow}
          {showDescription && (
            <DescriptionModal
              description={description}
              handleClose={closeModal}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
