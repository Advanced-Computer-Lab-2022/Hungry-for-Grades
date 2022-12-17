import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import styles from './Cart.module.scss';

import MoveButtons from './MoveButtons';

import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import { CourseDiscount, ICourse } from '@/interfaces/course.interface';
import { IUser } from '@/interfaces/user.interface';
import { UseCountry } from '@/store/countryStore';
import { UseUser } from '@/store/userStore';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { getRequest } from '@/services/axios/http-verbs';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Pagination from '@/components/pagination/Pagination';

async function getCart(country: string, activePage: number, user: IUser) {
  const Courses = TraineeRoutes.GET.getMyCart;

  Courses.URL = `/trainee/${encodeURIComponent(user?._id)}/cart`;

  Courses.query = `country=${country}&limit=${3}&page=${activePage}`;

  return getRequest<PaginatedResponse<ICourse>>(Courses);
}

function getOriginalPrice(
  price: number,
  discounts: CourseDiscount[]
): number | undefined {
  if (discounts?.length == 0) {
    return undefined;
  }
  const now = new Date();
  let ddiscounts = 0;
  /*const discount = discounts.find(
      d => new Date(d?.startDate) <= now && new Date(d?.endDate) > now
    );*/
  for (let i = 0; i < discounts.length; ++i) {
    const start: Date = discounts[i]?.startDate as Date;
    const end: Date = discounts[i]?.endDate as Date;
    if (new Date(start) <= now && new Date(end) > now)
      ddiscounts += discounts.at(i)?.percentage as number;
  }
  if (!ddiscounts) {
    return undefined;
  }
  return (price / (100 - ddiscounts)) * 100;
}

export default function Cart() {
  const user = UseUser();

  const [activePage, setActivePage] = useState(1);

  const con = UseCountry();

  const [whenDeleteCourse, setWhenDeleteCourse] = useState(0);

  const location = useLocation();

  const { isLoading, data, isError, error } = useQuery(
    ['ASJLHFXYZZ', con, whenDeleteCourse, location, activePage],
    () => getCart(con, activePage, user as IUser),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  if (isError || error) {
    return (
      <ErrorMessage
        errorMessage='an Error has occurred'
        link='/report'
        linkTitle='Report your problem'
      />
    );
  }

  if (!data?.data.success) {
    return (
      <ErrorMessage
        errorMessage='an Error has occurred'
        link='/report'
        linkTitle='Report your problem'
      />
    );
  }

  function updateNum() {
    setWhenDeleteCourse(whenDeleteCourse + 1);
  }

  function updateActiveOnDelete() {
    if (activePage > 1) setActivePage(activePage - 1);
  }

  if (isLoading) {
    return <LoaderComponent />;
  }

  const cart = data?.data?.data;

  let totalOldd = 0;

  let total = 0;

  let currency = '';

  const toShow = cart?.map((course: ICourse) => {
    const oldd: number | undefined = getOriginalPrice(
      course?.price?.currentValue,
      course?.price?.discounts
    );
    currency = course?.price?.currency;
    totalOldd += oldd == undefined ? 0 : oldd;
    total += course?.price?.currentValue;
    return (
      <>
        <div className={styles.product}>
          <div className='row'>
            <div className='col-md-3'>
              <img
                alt='course'
                className='img-fluid mx-auto d-block image'
                src={course?.thumbnail}
              />
            </div>
            <div className='col-md-8'>
              <div className={styles.info}>
                <div className='row'>
                  <div className='col-md-5 product-name'>
                    <div className={styles.product_name}>
                      <a href='x'>{course?.title}</a>
                      <div className={styles.product_info}>
                        <div>
                          Instructor:{' '}
                          <span className={styles.value}>
                            {course?._instructor?.at(0)?.name}
                          </span>
                        </div>
                        <div>
                          Category:{' '}
                          <span className={styles.value}>
                            {course?.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.price ?? ''} col-md-3`}>
                    <span>
                      {course?.price?.currentValue}
                      {course?.price?.currency}
                    </span>
                  </div>
                  {oldd != undefined && (
                    <div className={`${styles.price ?? ''} col-md-3`}>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          fontWeight: '300',
                          color: 'grey'
                        }}
                      >
                        {oldd}
                        {course?.price?.currency}
                      </span>
                    </div>
                  )}
                </div>
                <MoveButtons
                  id={course?._id}
                  price={course?.price?.currentValue}
                  refreshPage={updateActiveOnDelete}
                  updatePage={updateNum}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <section className={styles.shopping_cart}>
      <div className='container'>
        <div className={styles.block_heading}>
          <h2>{data?.data?.totalResults} Courses in your Cart</h2>
        </div>
        <div className={styles.content}>
          <div className='row'>
            <div className='col-md-12 col-lg-8'>
              <div className={styles.items}>{toShow} </div>
              <Pagination
                activePage={activePage}
                pages={data?.data?.totalPages}
                setActivePage={setActivePage}
              />
            </div>
            <div className='col-md-12 col-lg-4'>
              <div className={styles.summary}>
                <h3>Summary</h3>
                <div className={styles.summary_item}>
                  <span className={styles.text}>Total</span>
                  <span className={styles.price}>
                    {total}
                    {currency}
                  </span>
                </div>
                {totalOldd != total && (
                  <div className={styles.summary_item}>
                    <span className={styles.text}>Original</span>
                    <span
                      className={styles.price}
                      style={{ color: 'grey', textDecoration: 'line-through' }}
                    >
                      {totalOldd}
                      {currency}
                    </span>
                  </div>
                )}
                <button
                  className='btn btn-primary btn-lg btn-block'
                  type='button'
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
