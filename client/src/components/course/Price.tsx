import styles from './price.module.scss';

import { formatCurrency } from '@/utils/currency';
import { CourseCardProps } from '@/pages/landing/types';

function Price(props: CourseCardProps) {
  if (props.originalPrice) {
    return (
      <div className={styles['fnt-md-b']}>
        {formatCurrency(props.price, props.currency)}{' '}
        <small className={`${styles['original-price'] ?? ''}`}>
          {formatCurrency(props.originalPrice, props.currency)}
        </small>
      </div>
    );
  }
  return (
    <div className={styles['fnt-md-b']}>
      {formatCurrency(props.price, props.currency)}
    </div>
  );
}

export default Price;
