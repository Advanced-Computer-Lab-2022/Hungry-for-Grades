import { memo } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './singleSelect.module.scss';
import { type SingleSelectProps } from './types';

import { customComparator } from '@/utils/comparator';

function SingleSelect(props: SingleSelectProps) {
  const { options, setSelectedOption, selectedOption, isLoading, isDisabled } =
    props;

  return (
    <select
      className={`form-select w-100 ${styles.select ?? ''} `}
      disabled={isDisabled}
      value={selectedOption}
      onChange={e => setSelectedOption(e.target.value)}
    >
      {isLoading && <option>Loading...</option>}
      {options?.map(option => (
        <option
          key={option.value}
          className={'form-select'}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SingleSelect, customComparator);
