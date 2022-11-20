/* eslint-disable sonarjs/cognitive-complexity */
import { Country } from 'country-state-city';
import ReactCountryFlag from 'react-country-flag';

import styles from './ReviewContainer.module.scss';

function getRemainingTime(d: string) {
  const curr = new Date();
  const d2 = new Date(d);
  const diff = Math.abs(curr - d2) / 86400000;
  if (diff / 1 < 1) {
    const hours = diff / 24;
    if (hours < 1) {
      const minutes = hours / 60;
      if (minutes >= 1) {
        return minutes.toString() + ' minutes ago';
      } else return 'just now';
    } else return hours.toString() + ' hours ago';
  } else {
    if (diff < 7 && diff >= 1) return Math.floor(diff).toString() + ' days ago';
    if (diff < 30) return Math.floor(diff / 7).toString() + ' weeks ago';
    else if (diff < 365)
      return Math.floor(diff / 30).toString() + ' months ago';
    else return Math.floor(diff / 365).toString() + ' years ago';
  }
}

function getISO(countryy: string): string {
  const arr = Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.isoCode
  }));

  for (let i = 0; i < arr.length; ++i) {
    console.log(arr.at(i)?.label);
    if (arr.at(i)?.label == countryy) return arr.at(i)?.value as string;
  }
  return 'US';
}

export default function ReviewContainer(props: {
  name: string;
  img: string;
  comment: string;
  createdAt: string;
  rating: number;
  country: string;
}) {
  const toPrint = getRemainingTime(props.createdAt);
  const code = getISO(props.country);
  let toCountry = '';
  if (props.country == 'Palestinian Territory Occupied')
    toCountry = 'Palestine';
  else toCountry = props.country;
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
          {toCountry.length > 0 && (
            <div className={styles.reviewer_country}>
              <ReactCountryFlag
                svg
                countryCode={code}
                style={{ width: '1.2rem', height: '1rem' }}
              />
              <>&nbsp;</>
              <span style={{ fontSize: '1rem', fontWeight: '400' }}>
                {' '}
                {toCountry}{' '}
              </span>
            </div>
          )}
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
              {toPrint}
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
