// NEED TO BE REVISED
// eslint-disable-next-line css-modules/no-unused-class
import { toast } from 'react-toastify';

import { HiOutlineDocumentReport } from 'react-icons/hi';

import { useState } from 'react';

import DescriptionModal from '../reportRequests/DescriptionModal';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './AdminTable2.module.scss';

import { AllReport, Status } from '@/interfaces/reports.interface';
import usePatchQuery from '@/hooks/usePatchQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { toastOptions } from '@/components/toast/options';
import FollowUp from '@/pages/trainee/followUps/FollowUp';

export default function AdminHome(props: {
  data: AllReport[];
  st: Set<AllReport>;
  funA: (x: AllReport) => void;
  funR: (x: AllReport) => void;
  updateTable: (x: number) => void;
  num: number;
  clearSet: () => void;
}) {
  const [all, setAll] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [curr, setCurr] = useState<AllReport>();

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const [description, setDescription] = useState('');

  function closeModal() {
    setShowDescription(false);
  }

  function handleMultipleRows(report: AllReport) {
    if (props?.st.has(report)) {
      //then we are removing it now
      setAll(false);
      props?.funR(report);
    } else {
      props?.funA(report);
    }
  }

  function handleClick() {
    setShowModal(!showModal);
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

  let i = 0;

  const toShow =
    props.data && props.data?.length ? (
      // eslint-disable-next-line sonarjs/cognitive-complexity
      props.data?.map((report: AllReport) => {
        i++;
        const isDisabled =
          report?.status == 'Pending' || report?.status == 'Unseen'
            ? false
            : true;
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
                id={
                  'CheckBox' +
                  (1381124191 * 1050510891 + -10 + 1124912 + i * i).toString()
                }
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
            <td>{report?.instructorInfo?.at(0)?.name? report?.instructorInfo?.at(0)?.name:report?.traineeInfo.at(0)?.name}</td>
            <td>{report?.reason}</td>
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
              <td
                style={{
                  textAlign: 'center'
                }}
              >
                No Actions Required
              </td>
            )}
            {!(
              report?.status == 'Resolved' || report?.status == 'Rejected'
            ) && (
              <td
                className='col'
                style={{
                  textAlign: 'center'
                }}
              >
                {report?.status == Status.UNSEEN && (
                  <button
                    className={`btn btn-outline-primary mx-2`}
                    type='button'
                    onClick={() => handleAction(Status?.PENDING, report)}
                  >
                    Mark as Pending
                  </button>
                )}
                <button
                  className={`btn btn-primary`}
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
                  <HiOutlineDocumentReport
                    className={styles.report_description}
                  />
                </button>
              )}
              {report?.description == '' && 'No Description'}
            </td>
            <td>
              <button
                style={{ color: '#a00407' }}
                type='button'
                onClick={() => {
                  setShowModal(!showModal);
                  setCurr(report);
                }}
              >
                Follow ups
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={8} style={{ textAlign: 'center' }}>
          No Reports are Found
        </td>
      </tr>
    );

  return (
    <div
      className='fluid-container table-responsive'
      style={{ overflowX: 'auto' }}
    >
      <table
        className={`${
          styles.container ?? ''
        }  table table-responsive table-hover`}
				style={{
					filter: 'drop-shadow(0 0 0.1rem #eee)',
					borderRadius: '0.25rem',
					boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)'
				}}
      >
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
            <th>User</th>
            <th>Report Type</th>
            <th>Date</th>
            <th style={{ paddingLeft: '0.5rem' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
            <th>Description</th>
            <th style={{ paddingLeft: '1.8rem' }}>Follow Ups</th>
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
          {showModal && (
            <FollowUp
              func={handleClick}
              report={curr as AllReport}
              trainee={'false'}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
