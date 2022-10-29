/* import { SearchSectionProps } from '../types';

import SelectInput from '@/components/inputs/select/Select';

function RangeSlider(props: SearchSectionProps) {
	const { setSelectedFilters, selectedFilters } = props;
  return (
    <div className='input-group w-100'>
      <label className='form-label' htmlFor='customRange2'>
        Price range
      </label>
      <SelectInput
        isClearable={false}
        isDisabled={false}
        isLoading={false}
        isMulti={false}
        isSearchable={false}
        options={[
          { label: '0-1000', value: {min:0,max:1000} },

          { label: '1000-2000', value: 'mobile' }
        ]}
        selectedOption={''}
        setSelectedOption={function handleChange(value) {
					console.log(value);
					setSelectedFilters(prev => {
						return {
							...prev,
							category: value.label
						};
					});
					return value;
				}
				}}
      />
    </div>
  );
}

export default RangeSlider;
 */
