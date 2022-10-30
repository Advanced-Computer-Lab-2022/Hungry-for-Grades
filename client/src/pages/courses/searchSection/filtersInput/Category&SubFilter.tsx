/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type SearchSectionProps } from '../types';

import useCategoryQuery from './useCategoryQuery';

import SingleSelect from '@/components/inputs/select/SingleSelect';

function CategoryFilter(props: SearchSectionProps) {
  const { setSelectedFilters, selectedFilters } = props;
  const { data, isLoading, error } = useCategoryQuery();
  if (error || isLoading || !data) {
    return <div>error</div>;
  }
  return (
    <div className='d-flex flex-column justify-content-between w-100 gap-4'>
      <div className='input-group w-100'>
        <label className='form-label' htmlFor='select-category'>
          Category
        </label>
        <SingleSelect
          isDisabled={error || isLoading || !data}
          isLoading={isLoading}
          options={
            data?.data.map(category => ({
              label: category.label,
              value: category.label
            })) ?? []
          }
          selectedOption={selectedFilters.category}
          setSelectedOption={function (value) {
            setSelectedFilters(prev => {
              return {
                ...prev,
                category: value
              };
            });
          }}
        />
      </div>
      <div className='input-group w-100'>
        <label className='form-label' htmlFor='select-subCategory'>
          Sub Category
        </label>
        <SingleSelect
          isDisabled={error || isLoading || !data || !selectedFilters.category}
          isLoading={isLoading}
          options={
            data?.data
              .find(value => value.label === selectedFilters.category)
              ?.subcategory.map(subcategory => ({
                label: subcategory.label,
                value: subcategory.label
              })) ?? []
          }
          selectedOption={selectedFilters.subCategory}
          setSelectedOption={function (value) {
            setSelectedFilters(prev => {
              return {
                ...prev,
                subCategory: value
              };
            });
          }}
        />
      </div>
    </div>
  );
}

export default CategoryFilter;
