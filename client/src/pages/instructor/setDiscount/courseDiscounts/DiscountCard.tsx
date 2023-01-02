/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unused-prop-types */

import { useState } from 'react';
import { Card, Stack, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

import DiscountModal from '../DiscountModal';

import styles from './DiscountCard.module.scss';

import { toastOptions } from '@/components/toast/options';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { deleteRequest } from '@/services/axios/http-verbs';

async function handleDelete(
  discountID: string,
  courseID: string,
  updateFunction: () => void
) {
  const Discount = InstructorRoutes.DELETE.deleteDiscount;

  Discount.URL = `/courses/${courseID}/discount/${discountID}`;

  const data = await deleteRequest(Discount);

  if (!data.status) {
    toast.error('An error has occured please try again...', toastOptions);
  } else {
    toast.success('Discount is Deleted Successfully', toastOptions);
  }

  updateFunction();
}

export default function DiscountCard(props: {
  startDate: string;
  endDate: string;
  percent: number;
  discountID: string;
  courseID: string;
  update: () => void;
}) {
  const [show, setShow] = useState(false);
  const date = props.endDate.split('T')[0] as string;
  return (
    <>
      <Card
        className={`h-100 text-reset text-decoration-none`}
        style={{ width: '25%', marginRight: '1rem', marginBottom: '1rem' }}
      >
        <Card.Body>
          <div style={{ marginLeft: '80%' }}>
            <RiEdit2Line
              className={styles.iconn}
              style={{ fontSize: '1.2rem' }}
              onClick={() => setShow(true)}
            />
            <RiDeleteBinLine
              className={styles.iconn}
              style={{ color: '#A00407', fontSize: '1.2rem' }}
              onClick={() =>
                handleDelete(props.discountID, props.courseID, props.update)
              }
            />
          </div>
          <Stack
            className='align-items-center justify-content-center h-100'
            gap={2}
          >
            <span className='fs-5'>{props?.percent.toString() + '%'}</span>

            <Stack
              className='justify-content-center flex-wrap'
              direction='horizontal'
              gap={1}
            >
              {props.endDate.length > 0 && (
                <Badge
                  bg='secondary'
                  className='text-white text-truncate'
                  style={{ fontSize: '0.9rem' }}
                >
                  {'End Date: ' + date}
                </Badge>
              )}
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
      {show && (
        <DiscountModal
          handleClose={() => setShow(false)}
          id={props.courseID}
          updateFlag={props.discountID}
          updateFunc={props.update}
        />
      )}
    </>
  );
}
