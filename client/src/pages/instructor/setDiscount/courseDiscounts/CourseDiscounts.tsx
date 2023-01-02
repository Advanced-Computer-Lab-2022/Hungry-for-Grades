/* eslint-disable sonarjs/no-redundant-boolean */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import DiscountModal from '../DiscountModal';

import DiscountCard from './DiscountCard';

import useCourseDiscountsQuery from './useCourseDiscountsQuery';

import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';

function handleClick(setShow: {
  (value: SetStateAction<boolean>): void;
  (arg0: boolean): any;
}) {
  return setShow(true);
}

function closeModal(setShow: {
  (value: SetStateAction<boolean>): void;
  (arg0: boolean): void;
}) {
  setShow(false);
}

export default function CourseDiscounts() {
  const [show, setShow] = useState(false);

  const [refresh, setRefresh] = useState(0);

  const id = useParams();

  function updateData() {
    setRefresh(refresh + 1);
  }

  const locationn  = useLocation() ;

  const { isLoading, data } = useCourseDiscountsQuery(
    id.courseid as string,
    refresh,
    locationn
  );

  if (isLoading) {
    return <LoaderComponent />;
  }

  const list = data?.data?.data;

  if (list == undefined) {
    return <div>Empty</div>;
  }

  const toShow = list.map(
    (discount: typeof CoursesRoutes.GET.getDiscounts.response.data[0]) => {
      return (
        <DiscountCard
          key={discount._id}
          courseID={id.courseid as string}
          discountID={discount._id}
          endDate={discount.endDate}
          percent={discount.percentage}
          startDate={discount.startDate}
          update={updateData}
        />
      );
    }
  );

  return (
    <>
      <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
        <div
          style={{
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '600',
            fontFamily:
              'udemy sans,sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol'
          }}
        >
          {id.title} Discounts
        </div>
        <button
          style={{
            marginBottom: '2%',
            backgroundColor: '#A00407',
            color: 'white'
          }}
          type='button'
          onClick={() => handleClick(setShow)}
        >
          Add new Discount
        </button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{toShow}</div>
      </div>
      {show == true && (
        <DiscountModal
          handleClose={() => closeModal(setShow)}
          id={id.courseid as string}
          updateFlag={''}
          updateFunc={updateData}
        />
      )}
    </>
  );
}
