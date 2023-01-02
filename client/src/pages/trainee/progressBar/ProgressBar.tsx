import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import styles from './ProgressBar.module.scss';

import { toastOptions } from '@/components/toast/options';
import usePostQuery from '@/hooks/usePostQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { POSTRoutesType } from '@/services/axios/types';
import { UseUser } from '@/store/userStore';
import { Reason, Status } from '@/interfaces/reports.interface';
import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';
import ReportForm from '@/components/footer/ReportForm';

export default function ProgressBar(props: {
  completed: number;
  courseID: string;
}) {
  const user = UseUser();

  const navigate = useNavigate();

  const { mutateAsync: submitReport } = usePostQuery();

  async function clickSubmit() {
    const Courses = ReportDataService.POST.makeReport;

    Courses.payload = {
      _course: props?.courseID,
      _user: user?._id,
      description: '',
      reason: Reason.REFUND,
      status: Status.UNSEEN
    };

    const response = await toast.promise(
      submitReport(Courses as POSTRoutesType),
      {
        pending: 'Sending Report...'
      },
      toastOptions
    );
    if (response?.status) {
      toast.success('Refund is Requested Successfully...', toastOptions);
    } else {
      toast.error(
        'You have already requested a refund for this course',
        toastOptions
      );
    }
  }

  const color = props.completed <= 30 ? 'red' : '#00ABB3';
  const colorRefund = props.completed > 50 ? '#B2B2B2' : '#A00407';
  const colorCertificate = props.completed != 100 ? '#B2B2B2' : '#A00407';
  const check =
    user?.role.toLocaleLowerCase() == Role.TRAINEE.toLocaleLowerCase() &&
    !(user as ITrainee)?.isCorporate;

  function handleCertificate() {
    navigate(`../certificate/${props?.courseID}`);
  }

  return (
    <>
      <div className={`${styles.cover || ''} d-flex`}>
        <div
          className={styles.actual}
          style={
            {
              '--rating': props.completed,
              '--color': color
            } as React.CSSProperties
          }
        />
      </div>
      <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#B2B2B2' }}>
        {props.completed}% Completed
      </div>
      <div className='d-flex mt-0'>
        {check && (
          <button
            className={styles.refund}
            disabled={props.completed > 50}
            style={{ color: colorRefund }}
            type='button'
            onClick={() => clickSubmit()}
          >
            Ask for Refund
          </button>
        )}

        {props?.completed >= 0 && (
          <button
            className={`${styles.refund || ''} m-3`}
            disabled={props.completed != 100}
            style={{ color: colorCertificate }}
            type='button'
            onClick={() => handleCertificate()}
          >
            Certificate
          </button>
        )}
        <div className={styles.seperator} />
        <div
          className='pt-3'
          style={{
            marginLeft: '1rem',
            fontSize: '0.9rem',
            alignItems: 'center',
            color: '#A00407',
            fontWeight: '600'
          }}
        >
          <ReportForm courseID={props.courseID} />
        </div>
      </div>
    </>
  );
}
