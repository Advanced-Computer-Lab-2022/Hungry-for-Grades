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





export default function ProgressBar(props: { completed: number, courseID : string }) {

  const user  = UseUser();

  const { mutateAsync: submitReport } = usePostQuery();

  async function clickSubmit() {

    const Courses = ReportDataService.POST.makeReport;

    Courses.payload = {
      _course: props?.courseID,
      _user: user?._id,
      reason: Reason.REFUND,
      status: Status.PENDING
    };

    const response = await submitReport(Courses as POSTRoutesType);

    const flg = response?.status;
    if(flg)
    {
      toast.success('Refund is Requested Successfully...', toastOptions);
    }
    else{
      toast.error(response?.data?.message, toastOptions);
    }

  }

  const color = props.completed <= 30 ? 'red' : '#00ABB3';
  const colorRefund = props.completed > 50 ? '#B2B2B2' : '#A00407';
  const check = (user?.role==Role.TRAINEE) && (user as ITrainee)?.isCorporate;

  alert((user?.role==Role.TRAINEE));
  
  return (
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
      <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#B2B2B2' }}>
        {props.completed}% Completed
        { check &&
        <button className = {styles.refund} style={{color:colorRefund}} type = 'button' onClick={()=>clickSubmit()}>
        Ask for Refund
      </button>
        }
      </div>
    </div>
  );
}
