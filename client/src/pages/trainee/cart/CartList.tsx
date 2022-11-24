/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useQuery } from '@tanstack/react-query';

import CartCard from './CartCard';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { UseCountry } from '@/store/countryStore';

async function getCart(country: string) {
  const Courses = TraineeRoutes.GET.getMyCart;

  Courses.URL = '/trainee/637969352c3f71696ca34759/cart';

  Courses.query = `country=${country}`;

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
  const con = UseCountry();

  const { isLoading, data } = useQuery(
    ['ASJLHFXYZZ', con],
    () => getCart(con),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  if (isLoading) {
    return <div>Ana Hena Ma5lst4</div>;
  }

  const cart: typeof TraineeRoutes.GET.getMyCart.response.data =
    data?.data?.data;

  let total = 0,
    totalOld = 0;

  let currency = '';

  const toShow = cart.map(
    (course: typeof TraineeRoutes.GET.getMyCart.response.data[0]) => {
      const oldd = getOriginalPrice(
        course.price.currentValue,
        course.price.discounts
      );
      currency = course.price.currency;
      if (oldd != undefined) totalOld += oldd;
      else totalOld += course.price.currentValue;
      total += course.price.currentValue;

      return (
        <>
          <CartCard
            key={course._id}
            category={course.category}
            currency={course.price.currency}
            discount={course.price.discounts}
            img={course.thumbnail}
            old={oldd}
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
      </div>

      <div
        style={{
          display: 'inline-block',
          marginTop: '6rem',
          marginLeft: '2rem'
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
          {total}
          {currency}
        </div>
        {totalOld > total && (
          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'rgb(127, 132, 135)',
              textDecoration: 'line-through',
              marginTop: '1rem'
            }}
          >
            {totalOld}
            {currency}
          </div>
        )}
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
  );
}
