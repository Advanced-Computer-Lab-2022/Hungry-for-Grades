/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import CartCard from './CartCard';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';
import Pagination from '@/components/pagination/Pagination';

async function getCart(country: string, activePage: number) {
  const Courses = TraineeRoutes.GET.getMyCart;

  Courses.URL = '/trainee/637969352c3f71696ca34759/cart';

  Courses.query = `country=${country}&limit=${4}&page=${activePage}`;

  return getRequest(Courses);
}

function getOriginalPrice(
  price: number,
  discounts: object[]
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
  return (price / (100 - discount.percentage)) * 100;
}

export default function CartList() {
  const [activePage, setActivePage] = useState(1);

  const con = UseCountry();

  const [whenDeleteCourse, setWhenDeleteCourse] = useState(0);

  const location = useLocation();

  const { isLoading, data } = useQuery(
    ['ASJLHFXYZZ', con, whenDeleteCourse, location, activePage],
    () => getCart(con, activePage),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  function updateNum() {
    setWhenDeleteCourse(whenDeleteCourse + 1);
  }

  function updateActiveOnDelete() {
    if (activePage > 1) setActivePage(activePage - 1);
  }

  if (isLoading) {
    return <>Loading </>;
  }

  const cart: typeof TraineeRoutes.GET.getMyCart.response.data =
    data?.data?.data;

  let currency = '';

  const toShow = cart.map(
    (course: typeof TraineeRoutes.GET.getMyCart.response.data[0]) => {
      const oldd = getOriginalPrice(
        course.price.currentValue,
        course.price.discounts
      );
      currency = course.price.currency;
      return (
        <>
          <CartCard
            key={course._id}
            category={course.category}
            currency={course.price.currency}
            discount={course.price.discounts}
            id={course._id}
            img={course.thumbnail}
            old={oldd}
            passedFunction={updateNum}
            passedFunction2={updateActiveOnDelete}
            price={course.price.currentValue}
            rating={course.rating.averageRating}
            subcategory={course.subcategory.at(0)}
            title={course.title}
          />
        </>
      );
    }
  );

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
              pages={data?.data?.totalPages as number}
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
