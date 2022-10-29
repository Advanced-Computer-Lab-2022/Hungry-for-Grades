import Select from 'react-select';

import { type SelectProps } from './types';

function SelectInput(props: SelectProps) {
  const {
    options,
    isClearable,
    isDisabled,
    isSearchable,
    isLoading,
    setSelectedOption,
    isMulti,
    selectedOption
  } = props;

  return (
    <Select
      backspaceRemovesValue
      className='basic-multiple'
      classNamePrefix='select'
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isMulti={isMulti}
      isSearchable={isSearchable}
      name='color'
      options={options}
      selectedOption={selectedOption}
      onChange={setSelectedOption}
    />
  );
}

export default SelectInput;
