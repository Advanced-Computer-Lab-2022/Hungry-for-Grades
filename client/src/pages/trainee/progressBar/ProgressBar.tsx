import { toast } from 'react-toastify';

import styles from './ProgressBar.module.scss';

import { toastOptions } from '@/components/toast/options';
import usePostQuery from '@/hooks/usePostQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { POSTRoutesType } from '@/services/axios/types';
import { UseUser } from '@/store/userStore';
import { Reason, Status } from '@/interfaces/reports.interface';
import { Role } from '@/enums/role.enum';
import { ITrainee } from '@/interfaces/course.interface';

export default function ProgressBar(props: {
  completed: number;
  courseID: string;
}) {
  const user = UseUser();

  const { mutateAsync: submitReport } = usePostQuery();

  async function clickSubmit() {
    const Courses = ReportDataService.POST.makeReport;

    Courses.payload = {
      _course: props?.courseID,
      _user: user?._id,
      description: '',
      reason: Reason.REFUND,
      status: Status.PENDING
    };

    const response = await submitReport(Courses as POSTRoutesType);
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
  const check =
    user?.role.toLocaleLowerCase() == Role.TRAINEE.toLocaleLowerCase() &&
    !(user as ITrainee)?.isCorporate;

  return (
    <div>
      <div className={styles.cover}>
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
        {check && (
          <button
            className={styles.refund}
            style={{ color: colorRefund }}
            type='button'
            onClick={() => clickSubmit()}
          >
            Ask for Refund
          </button>
        )}
      </div>
    </div>
  );
}
