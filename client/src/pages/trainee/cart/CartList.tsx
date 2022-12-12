import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import CartCard from './CartCard';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';
import Pagination from '@/components/pagination/Pagination';
import { CourseDiscount, ICourse } from '@/interfaces/course.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import { UseUser } from '@/store/userStore';
import { IUser } from '@/interfaces/user.interface';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';

async function getCart(country: string, activePage: number, user: IUser) {
  const Courses = TraineeRoutes.GET.getMyCart;

  Courses.URL = `/trainee/${encodeURIComponent(user?._id)}/cart`;

  Courses.query = `country=${country}&limit=${4}&page=${activePage}`;

  return getRequest<PaginatedResponse<ICourse>>(Courses);
}

function getOriginalPrice(
  price: number,
  discounts: CourseDiscount[]
): number | undefined {
  if (!discounts?.length) {
    return undefined;
  }
  const now = new Date();
  const discount = discounts.find(
    d => new Date(d?.startDate) <= now && new Date(d?.endDate) > now
  );
  if (!discount) {
    return undefined;
  }
  return (price / (100 - discount?.percentage)) * 100;
}

export default function CartList() {
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

  if(!data?.data.success) 
  {
    return <ErrorMessage errorMessage='an Error has occurred' link='/report' linkTitle='Report your problem'/>;
  }

  function updateNum() {
    setWhenDeleteCourse(whenDeleteCourse + 1);
  }

  function updateActiveOnDelete() {
    if (activePage > 1) setActivePage(activePage - 1);
  }

  if (isLoading) {
    return <LoaderComponent /> ;
  }

  const cart = data?.data?.data;

  let currency = '';

  const toShow = cart?.map((course: ICourse) => {
    const oldd: number | undefined = getOriginalPrice(
      course?.price?.currentValue,
      course?.price?.discounts
    );
    currency = course.price.currency;
    return (
      <>
        <CartCard
          key={course?._id}
          category={course?.category}
          currency={course?.price?.currency}
          discount={course?.price?.discounts}
          id={course?._id}
          img={course?.thumbnail}
          old={oldd}
          passedFunction={updateNum}
          passedFunction2={updateActiveOnDelete}
          price={course?.price.currentValue}
          rating={course?.rating.averageRating}
          subcategory={course?.subcategory.at(0) as string}
          title={course.title}
        />
      </>
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '90%'
      }}
    >
      <div style={{ marginTop: '3rem', marginLeft: '15%', width: '60%' }}>
        <div
          style={{
            marginBottom: '2.5rem',
            fontWeight: '700',
            fontSize: '1.5rem',
            fontFamily: 'segoe ui',
            color: '#1c1d1f'
          }}
        >
          Courses(x) in your Cart
        </div>
        <hr style={{ width: '70%', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {toShow}
        </div>
        {data?.data?.totalPages > 1 && (
          <div style={{ marginLeft: 'auto' }}>
            <Pagination
              activePage={activePage}
              pages={data?.data?.totalPages}
              setActivePage={setActivePage}
            />
          </div>
        )}
      </div>
      <div className='container d-flex flex-row justify-content-end'>
        <div
          style={{
            marginTop: '6rem',
            marginLeft: '2rem',
            textAlign: 'left'
          }}
        >
          <div
            style={{ fontSize: '1.4rem', fontWeight: '500', color: '#a00407' }}
          >
            Total:
          </div>
          <div
            style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '1rem' }}
          >
            {data?.data?.totalCost} &nbsp;
            {currency}
          </div>
          <button
            style={{
              width: '20rem',
              height: '3rem',
              border: 'none',
              backgroundColor: '#a00407',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginTop: '1rem'
            }}
            type='button'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
