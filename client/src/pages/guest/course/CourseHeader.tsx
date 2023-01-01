import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import styles from './course-header.module.scss';

import CourseRating from './CourseRating';

import CoursePreviewVideo from './CoursePreviewVideo';

import { type ICourse } from '@interfaces/course.interface';
import Instructors from '@/components/courseCard/Instructor';
import { formatDuration } from '@/utils/duration';
import useCourseButtons from '@/hooks/useCourseButtons';
import {
  useWishListDeleteQuery,
  useCartDeleteQuery,
  addtoWishList
} from '@/components/courseCard/cardButtons/buttons';
import { toastOptions } from '@/components/toast/options';
import usePostQuery from '@/hooks/usePostQuery';
import { Reason, Status } from '@/interfaces/reports.interface';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import {
  UseCartStoreInCart,
  UseCartStoreRemoveCourse
} from '@/store/cartStore';
import { UseUser } from '@/store/userStore';
import {
  UseWishListAddCourse,
  UseWishListRemoveCourse,
  UseWishListInCart
} from '@/store/wishListStore';
import useRedirectToLogin from '@/hooks/useRedirectToLogin';

function CourseHeader(props: ICourse & { videoClassName: string }) {
  const redirectToLogin = useRedirectToLogin();
  const { requestAccess, viewCourse, addToWishList } = useCourseButtons(
    props._id
  );
  const isInCart = UseCartStoreInCart()(props?._id);
  const addCourseToWishList = UseWishListAddCourse();
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props?._id);
  const removeCourseToCart = UseCartStoreRemoveCourse();
  const user = UseUser();
  //Actual Post Requests
  const { mutateAsync: addToWishListFromTheButton } = usePostQuery();
  const { mutateAsync: makeCourseRequest } = usePostQuery();

  console.log(isInCart);

  //Actual Delete
  const { refetch: actualDeleteWishList } = useWishListDeleteQuery(
    user?._id as string,
    props?._id
  );
  const { refetch: actualDeleteCart } = useCartDeleteQuery(
    user?._id as string,
    props?._id
  );

  async function requestAcessHussein() {
    const req = ReportDataService.POST.makeReport;
    req.payload = {
      _course: props?._id,
      _user: user?._id,
      reason: Reason.COUSE_REQUEST,
      status: Status.UNSEEN
    };

    const ress = await makeCourseRequest(req);

    if (!ress?.status)
      toast.error(
        'You have already requested access to this course before',
        toastOptions
      );
    else
      toast.success(
        'Your request is sent to the admin successfully',
        toastOptions
      );
  }

  return (
    <div className={`py-3 text-light bg-dark rounded-3 mb-3`}>
      <div className='container'>
        <nav aria-label='breadcrumb mx-3'>
          <ol className={`breadcrumb ${styles['bread-crumb'] ?? ''}`}>
            <li className='breadcrumb-item'>
              <Link className='text-light' to='/courses'>
                {props.category}
              </Link>
            </li>
            {props.subcategory.map(s => (
              <li key={s} className='breadcrumb-item'>
                <Link className='text-light' to='/courses'>
                  {s}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className={props.videoClassName}>
        <CoursePreviewVideo {...props} />
      </div>
      <div className='container'>
        <h1>{props.title}</h1>
        {/* <div className='float-end'>
            <img alt={props.title} height='135px' src={props.thumbnail} width='240px'/>
      </div> */}
        <small className='pb-2' style={{ fontSize: '1.2rem' }}>
          {props.description}
        </small>
        <CourseRating {...props.rating} />
        <div className={`text-light`}>
          Created by: &nbsp;
          <Instructors instructors={props._instructor} />
        </div>
        <div className={`text-light`}>
          Duration: &nbsp;
          {formatDuration(props.duration * 60)}
        </div>

        {addToWishList && (
          <div className={`${props.videoClassName} mt-2`}>
            <button
              className='btn btn-light w-100'
              type='button'
              onClick={async () => {
                if (!user) {
                  redirectToLogin();
                  return;
                }
                const xx = await addtoWishList(
                  props?._id,
                  isInCart,
                  isInWishList,
                  user,
                  addCourseToWishList,
                  removeCourseToWishList,
                  removeCourseToCart,
                  addToWishListFromTheButton
                );
                if (xx === 1) {
                  await actualDeleteCart();
                } else if (xx === 2) {
                  //alert('I will Delete Back ' + props?.id);
                  await actualDeleteWishList();
                  //alert('Done');
                }
              }}
            >
              {!isInWishList && <strong>Add to Wishlist</strong>}
              {isInWishList && <strong>Remove from Wishlist</strong>}
            </button>
          </div>
        )}
        {viewCourse && (
          <div className={`${props.videoClassName} mt-2`}>
            <button className='btn btn-light w-100' type='button'>
              <strong>Go to course</strong>
            </button>
          </div>
        )}
        {requestAccess && (
          <div className={`${props.videoClassName} mt-2`}>
            <button
              className='btn btn-light w-100'
              type='button'
              onClick={async () => {
                await requestAcessHussein();
              }}
            >
              <strong>Request access</strong>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseHeader;
