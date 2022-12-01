/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Link } from 'react-router-dom';

import { AiFillEdit } from 'react-icons/ai';

import { BsFillTrashFill, BsShareFill } from 'react-icons/bs';

import styles from './InstructorCourseCard.module.scss';

import { formatCurrency } from '@/utils/currency';
import { type InstructorRoutes } from '@services/axios/dataServices/InstructorDataService';

import { formatCurrency } from '@/utils/currency';

import Button from '@/components/buttons/button/Button';

import DiscountModal from './setDiscount/DiscountModal';
import { SetStateAction, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

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


// eslint-disable-next-line sonarjs/cognitive-complexity
function InstructorCourseCard(
  props: typeof InstructorRoutes.GET.getCourses.response.data[0]
) {
  const data = props?._course ?? '';
  const earned = props.earning;
  const photo = data?.thumbnail ?? '';
  const title = data?.title ?? '';
  const price = data?.price ?? '';
  const enrolled = data?.numberOfEnrolledTrainees ?? '';
  const rating = data?.rating?.averageRating ?? '';
  const discount = data?.price?.discounts;
  const oldPrice = getOriginalPrice(price.currentValue, discount);
  if (!props._course.price) return <></>;
  return (
    <div className={`${styles.cardContainer ?? ''}`}>
      <div
        className={`rows d-flex flex-column  mx-auto px-0 my-3 d-flex flex-md-row flex-column`}
        style={{ minHeight: '8rem' }}
      >
        <div
          className={`col d-flex  align-center ${styles.border_div || ''}`}
          style={{ height: '8rem', paddingLeft: '0' }}
        >
          <div>
            <img
              alt='course'
              className='img-fluid'
              src={photo}
              style={{
                height: '8rem',
                objectFit: 'fill'
              }}
            />
          </div>

          <div
            className='p-2 d-flex flex-column justify-content-around'
            style={{ width: '90%' }}
          >
            <h6 className={styles.courseTitle}>{title}</h6>
            <div className='d-flex align-items-center justify-content-between'>
              <div
                className={`bg-primary px-2 rounded-pill text-white

                 ${styles.fnt_sm || ''}`}
              >
                live
              </div>
              <div className={styles.fnt_sm}>
                <div style={{textDecoration:'line-through', display:'inline-block'}}>{formatCurrency(oldPrice, price.currency)}</div>
                &nbsp;&nbsp;
                {formatCurrency(price.currentValue, price.currency)}{' '}
              </div>
            </div>
          </div>
        </div>
        <hr className={`d-md-block d-none ${styles.hr || ''}`} />
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Total earned</div>
              <div>
                <h5>{formatCurrency(earned, price.currency)} </h5>
              </div>
            </div>
          </div>
          <hr className={styles.hr} style={{ top: '-0.1875rem' }} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Enrolled students</div>
              <div>
                <h4>{enrolled}</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <hr className={`d-md-block d-none  ${styles.hr || ''}`} />
          <div className={`col  ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Course rating</div>
              <div>
                <h4>{rating}</h4>
              </div>
            </div>
          </div>
          <hr className={styles.hr} style={{ top: '-0.1875rem' }} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div
                className={`${
                  styles.partOne ?? ''
                } d-flex justify-content-center`}
              >
                Unanswered questions
              </div>
              <div>
                <h4>2</h4>
              </div>
            </div>
          </div>
          <Link to={`/instructor/hussein/${props._course._id}`}><div style = {{width:'8rem', alignSelf:'center', fontSize:'0.2rem'}}>Discounts</div></Link> 
        </div>
      </div>
      <div className={`${styles.cardButtons ?? ''}`}>
        <Link className='btn btn-primary btn-lg' to={``}>
          Share
          <BsShareFill />
        </Link>
        <Link className='btn btn-primary btn-lg' to={``}>
          Edit
          <AiFillEdit />
        </Link>
        <Link className='btn btn-secondary btn-lg' to={``}>
          Delete
          <BsFillTrashFill />
        </Link>
      </div>
    </div>
  );
}

export default InstructorCourseCard;


