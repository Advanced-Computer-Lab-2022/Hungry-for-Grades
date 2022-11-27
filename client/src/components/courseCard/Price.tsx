import styles from './price.module.scss';

import { formatCurrency } from '@/utils/currency';
import { getOriginalPrice } from '@/pages/guest/landing/types';
import { IPrice } from '@/interfaces/course.interface';

function Price(props: IPrice) {
  const originalPrice = getOriginalPrice(props);

  if (originalPrice) {
    return (
      <div className={styles['fnt-md-b']}>
        {formatCurrency(props.currentValue, props.currency)}{' '}
        <small className={`${styles['original-price'] ?? ''}`}>
          {formatCurrency(originalPrice, props.currency)}
        </small>
      </div>
    );
  }
  return (
    <div className={styles['fnt-md-b']}>
      {formatCurrency(props.currentValue, props.currency)}
    </div>
  );
}

export default Price;
