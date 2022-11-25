import styles from './cart-card.module.scss';

import CourseRating from '@pages/course/CourseRating';

import { Rating } from '@/interfaces/course.interface';

export default function CartCard(props: {
  title: string;
  rating: number;
  category: string;
  subcategory: string;
  price: number;
  discount: [];
  currency: string;
  img: string;
  old: number;
}) {
  const rating: Rating = { averageRating: props.rating, reviews: [] };

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img alt='course' className={styles.img_itself} src={props.img} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.rating}>
          <CourseRating {...rating} />
        </div>
        <div className={styles.cat}>
          <span>{props.category}</span>{' '}
          <span style={{ fontSize: '2rem' }}>.</span>{' '}
          <span>{props.subcategory}</span>
        </div>
        <div className={styles.actions}>
          <span>Remove</span>
          <span>Move to Whishlist</span>
        </div>
      </div>
      <div className={styles.pricing}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {props.price} &nbsp;
            {props.currency}
          </div>
          {props.old != undefined && (
            <div
              style={{
                fontWeight: '500',
                color: '#7F8487',
                textDecoration: 'line-through',
                fontSize: '1.1rem'
              }}
            >
              {props.old} &nbsp;
              {props.currency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
