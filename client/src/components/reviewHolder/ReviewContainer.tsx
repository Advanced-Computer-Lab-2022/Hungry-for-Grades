import ReactCountryFlag from 'react-country-flag';

import styles from './ReviewContainer.module.scss';

function getRemainingTime(d: string) {
  const curr = new Date();

  const d2 = new Date(d);

  const diff = Math.abs(curr - d2) / 86400000;

  //Now we have the difference in days

  if (diff / 1 < 1) {
  } else {
    if (diff < 7) return toString(Math.floor(diff)) + 'days ago';
  }
}

export default function ReviewContainer(props: {
  name: string;
  img: string;
  comment: string;
  createdAt: string;
  rating: number;
}) {
  const toPrint = getRemainingTime(props.createdAt);
  return (
    <div className={styles.review_section}>
      <div className={styles.review_itself}>
        <div style={{ height: '100%', marginRight: '1.55rem' }}>
          <img alt='reviewer' className={styles.review_img} src={props.img} />
        </div>
        <div style={{ display: 'block' }}>
          <div className={styles.reviewer_name}>
            <div className={styles.name}>{props.name}</div>
          </div>
          <div className={styles.reviewer_country}>
            <ReactCountryFlag
              svg
              countryCode='US'
              style={{ width: '1.2rem', height: '1rem' }}
            />
            <>&nbsp;</>
            <span style={{ fontSize: '1rem', fontWeight: '400' }}>
              {' '}
              United States{' '}
            </span>
          </div>
          <div className={styles.rating_date_container}>
            <div
              className={styles.Stars}
              style={{ '--rating': props.rating } as React.CSSProperties}
            />
            <>&nbsp;&nbsp;</>
            <span
              style={{
                fontWeight: '400',
                lineHeight: '1.4',
                fontSize: '1rem',
                color: '#6a6f73'
              }}
            >
              a week ago
            </span>
          </div>
          <div
            style={{
              fontSize: '1.1rem',
              maxWidth: '35rem',
              fontWeight: '500',
              fontFamily: 'udemy sans'
            }}
          >
            {props.comment}
          </div>
        </div>
      </div>
    </div>
  );
}
