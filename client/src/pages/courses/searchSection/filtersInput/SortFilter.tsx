import { SearchSectionProps } from '../types';

import SingleSelect from '@/components/inputs/select/SingleSelect';

function LevelFilter(props: SearchSectionProps) {
  const { setSelectedFilters, selectedFilters } = props;
  return (
    <div className='input-group w-100'>
      <label className='form-label' htmlFor='select-level'>
        Sort By
      </label>

      <SingleSelect
        isDisabled={false}
        isLoading={false}
        options={[
          {
            label: 'Most Viewed',
            value: '0'
          },
          {
            label: 'Most Rated',
            value: '1'
          }
        ]}
        selectedOption={selectedFilters.level}
        setSelectedOption={function (value: '0' | '1') {
          setSelectedFilters(prev => {
            return {
              ...prev,
              sortBy: parseInt(value)
            };
          });
        }}
      />
    </div>
  );
}

export default LevelFilter;
