import { SearchSectionProps } from '../types';

import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';
function PaidFreeFilter(props: SearchSectionProps) {
  const { setSelectedFilters, selectedFilters } = props;
  return (
    <div className='w-20 d-flex flex-column gap-1 pt-2 my-0'>
      <CheckBoxInput
        checked={selectedFilters.paid}
        className={''}
        errorMessage={''}
        isChecked={false}
        label='Paid'
        name={'paid'}
        required={false}
        onChange={function handleChange(e) {
          setSelectedFilters(prev => {
            return { ...prev, paid: e.target.checked };
          });
        }}
      />
      <CheckBoxInput
        checked={selectedFilters.free}
        className={''}
        errorMessage={''}
        isChecked={false}
        label='Free'
        name={'free checkbox'}
        required={false}
        onChange={function handleChange(e) {
          setSelectedFilters(prev => {
            return { ...prev, free: e.target.checked };
          });
        }}
      />
    </div>
  );
}

export default PaidFreeFilter;
