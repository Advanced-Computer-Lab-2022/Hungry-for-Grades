import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { ITrainee } from '@/interfaces/course.interface';
import {
  addToWishlist,
  getEnrolledCourseById,
  addToCart,
  removeFromCart,
  removeFromWishlist
} from '@/services/axios/dataServices/TraineeDataService';
import { UseCountry } from '@/store/countryStore';

import { useUserStore } from '@/store/userStore';
import { Reason, ReportDTO, Status } from '@/interfaces/reports.interface';
import { requestCourse } from '@/services/axios/dataServices/ReportDataService';

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

  const removeFromWishList =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? async () => {
          const res = await removeFromWishlist(user._id, courseid, country);
          if (res) {
            toast('Course removed from Wishlist successfully');
          } else {
            toast('Course is not in Wishlist');
          }
        }
      : undefined;

  const addToWishList =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? async () => {
          const res = await addToWishlist(user._id, courseid);
          if (res) {
            toast('Course added to Wishlist successfully');
          } else {
            toast('Course is already in Wishlist');
          }
        }
      : undefined;

  const addCart =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? async () => {
          const res = await addToCart(user._id, courseid);
          if (res) {
            toast('Course added to Cart successfully');
          } else {
            toast('Course is already in Cart');
          }
        }
      : undefined;

  const removeCart =
    user &&
    user.role === 'Trainee' &&
    !user.isCorporate &&
    !isLoading &&
    isError
      ? async () => {
          const res = await removeFromCart(user._id, courseid, country);
          if (res) {
            toast('Course removed from Cart successfully');
          } else {
            toast('Course is not in Cart');
          }
        }
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
            status: Status.PENDING
          };
          const res = await requestCourse(reportData);
          if (res) {
            toast('Request access submitted successfully');
          } else {
            toast('You have already requested');
          }
        }
      : undefined;

  return {
    user,
    traineeId,
    addToWishList,
    addToCart: addCart,
    removeFromCart: removeCart,
    removeFromWishList,
    viewCourse,
    requestAccess
  };
}
