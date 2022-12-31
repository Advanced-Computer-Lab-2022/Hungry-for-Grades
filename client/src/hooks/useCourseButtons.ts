import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { ITrainee } from '@/interfaces/course.interface';
import { getEnrolledCourseById } from '@/services/axios/dataServices/TraineeDataService';
import { UseCountry } from '@/store/countryStore';

import { useUserStore } from '@/store/userStore';
import { Reason, Report, ReportDTO, Status } from '@/interfaces/reports.interface';
import { requestCourse } from '@/services/axios/dataServices/ReportDataService';
import { toastOptions } from '@/components/toast/options';
import { HttpResponse } from '@/interfaces/response.interface';

export default function (courseid: string) {
  const userStore = useUserStore();
  const user = userStore.getUser() as ITrainee | null;
  const country = UseCountry();
  const traineeId = user?._id;
  const navigate = useNavigate();

  const { isError, isLoading, data } = useQuery(
    ['getEnrolledCourseById', courseid, country, traineeId],
    () => getEnrolledCourseById(traineeId, courseid)
  );

  const addToWishList =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? () => {}
      : undefined;
  const addToCart =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? () => {}
      : undefined;

  const viewCourse =
    user && user.role === 'Trainee' && !isLoading && !isError && data
      ? () => {
          navigate(`/trainee/view-course/${courseid}`);
        }
      : undefined;

  const requestAccess =
    user &&
    user.role === 'Trainee' &&
    !isLoading &&
    isError &&
    user?.isCorporate
      ? async () => {
          const reportData: ReportDTO = {
            _course: courseid,
            _user: user._id,
            description: '',
            reason: Reason.COUSE_REQUEST,
            status: Status.UNSEEN
          };
          const res = await requestCourse(reportData);
          console.log(res)
          if (res?.status) {
            toast.success('Request access submitted successfully',toastOptions);
          } else {
            toast.error('Unsuccessful Request',toastOptions);
          }
        }
      : undefined;

  return {
    user,
    traineeId,
    addToWishList,
    addToCart,
    viewCourse,
    requestAccess
  };
}
