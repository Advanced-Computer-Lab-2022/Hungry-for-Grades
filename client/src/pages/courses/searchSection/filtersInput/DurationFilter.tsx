import { SearchSectionProps } from '../types';

import SingleSelect from '@/components/inputs/select/SingleSelect';

function DurationFilter(props: SearchSectionProps) {
  const { setSelectedFilters, selectedFilters } = props;
  return (
    <div className='input-group w-100'>
      <label className='form-label' htmlFor='select-duration'>
        Duration
      </label>
      <SingleSelect
        isDisabled={false}
        isLoading={false}
        options={[
          {
            label: 'Short',
            value: '0-1'
          },
          {
            label: 'Medium',
            value: '1-3'
          },
          {
            label: 'Long',
            value: '3-6'
          }
        ]}
        selectedOption={selectedFilters.level}
        setSelectedOption={function (value: string) {
          const [durationLow, durationHigh] = value.split('-');
          setSelectedFilters(prev => {
            return {
              ...prev,
              durationLow: parseInt(durationLow ?? '0'),
              durationHigh: parseInt(durationHigh ?? '12')
            };
          });
        }}
      />
    </div>
  );
}

export default DurationFilter;
