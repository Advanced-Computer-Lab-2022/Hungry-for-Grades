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
        value={false}
        onChange={function handleChange(e) {
          const minValue =
            e.target.checked && selectedFilters.free
              ? selectedFilters.min
              : e.target.checked
              ? 1
              : selectedFilters.min;
          setSelectedFilters(prev => {
            return { ...prev, paid: e.target.checked, min: minValue };
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
        value={false}
        onChange={function handleChange(e) {
          const minValue =
            e.target.checked && selectedFilters.paid
              ? selectedFilters.min
              : e.target.checked
              ? 0
              : selectedFilters.min;

          const maxValue =
            e.target.checked && selectedFilters.paid
              ? selectedFilters.max
              : e.target.checked
              ? 0
              : selectedFilters.max;

          setSelectedFilters(prev => {
            return {
              ...prev,
              free: e.target.checked,
              min: minValue,
              max: maxValue
            };
          });
        }}
      />
    </div>
  );
}

export default PaidFreeFilter;
