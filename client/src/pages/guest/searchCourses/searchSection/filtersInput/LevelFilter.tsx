import { SearchSectionProps } from '../types';

import SingleSelect from '@/components/inputs/select/SingleSelect';
import { Level } from '@/enums/level.enum';

function LevelFilter(props: SearchSectionProps) {
  const { setSelectedFilters, selectedFilters } = props;
  return (
    <div className='input-group w-100'>
      <label className='form-label' htmlFor='select-level'>
        Level
      </label>

      <SingleSelect
        isDisabled={false}
        isLoading={false}
        options={[
          {
            label: 'Beginner',
            value: 'Beginner'
          },
          {
            label: 'Intermediate',
            value: 'Intermediate'
          },
          {
            label: 'Advanced',
            value: 'Advanced'
          }
        ]}
        selectedOption={selectedFilters.level}
        setSelectedOption={function (value: string) {
          value = value as Level;
          setSelectedFilters(prev => {
            return {
              ...prev,
              level: value
            };
          });
        }}
      />
    </div>
  );
}

export default LevelFilter;
