/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styles from './InstructorCourseCard.module.css';

import { formatCurrency } from '@/utils/currency';

function InstructorCourseCard(props: any) {
  const data = props?.props?._course ?? '';
  const earned = props?.props?.earning ?? '';
  const photo = data?.thumbnail ?? '';
  const title = data?.title ?? '';
  const price = data?.price ?? '';
  const enrolled = data?.numberOfEnrolledTrainees ?? '';
  const rating = data?.rating?.averageRating ?? '';
  if (!props.props._course.price) return <></>;
  return (
    <div>
      <div
        className='container-lg row border border-primary mx-auto px-0 my-3 d-flex flex-md-row flex-column'
        style={{ minHeight: '8rem' }}
      >
        <div
          className={`col d-flex align-center border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem', paddingLeft: '0' }}
        >
          <div>
            <img
              alt='course'
              className='img-fluid'
              src={photo}
              style={{
                height: '8rem',
                objectFit: 'cover'
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
                className={`bg-primary px-2 rounded-pill
                 ${styles.fnt_sm || ''}`}
              >
                live
              </div>
              <div className={styles.fnt_sm}>
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

        <hr className={`d-md-block d-none ${styles.hr || ''}`} />
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <div className={`col ${styles.altCol || ''}`}>
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
              <div className={styles.partOne}>Unanswered questions</div>
              <div>
                <h4>2</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorCourseCard;
