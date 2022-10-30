import { memo } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './singleSelect.module.scss';
import { type SingleSelectProps } from './types';

import { customComparator } from '@/utils/comparator';

function SingleSelect({
  options,
  setSelectedOption,
  selectedOption,
  isLoading,
  isDisabled
}: SingleSelectProps) {
  return (
    <select
      className={`form-select w-100 ${styles.select ?? ''} `}
      defaultValue={'DEFAULT'}
      disabled={isDisabled}
      placeholder='Select'
      value={selectedOption}
      onChange={e => setSelectedOption(e.target.value)}
    >
      {isLoading && <option>Loading...</option>}
      {options && options?.length > 0 && (
        <option key={'All'} className={styles.option} value={''}>
          All
        </option>
      )}

      {options &&
        options.length > 0 &&
        options?.map(option => (
          <option
            key={option.value}
            className={styles.option}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
    </select>
  );
}

export default memo(SingleSelect, customComparator);
