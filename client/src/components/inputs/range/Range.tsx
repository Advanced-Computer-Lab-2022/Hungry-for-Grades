import styles from './range.module.scss';

import { type RangeProps } from './types';

function Range(props: RangeProps) {
  const { value, label, min, max, step, onChangeFunc, name } = props;
  return (
    <div className={styles.rangeContainer ?? ''}>
      <div>{label}</div>
      <input
        id='range'
        max={max ?? '100'}
        min={min ?? '0'}
        name={name}
        step={step ?? '2'}
        type='range'
        value={value}
        onChange={onChangeFunc}
      />
      <input
        className={styles.rangeNumber}
        name={name}
        type='number'
        value={value}
        onChange={onChangeFunc}
      />
    </div>
  );
}

export default Range;
