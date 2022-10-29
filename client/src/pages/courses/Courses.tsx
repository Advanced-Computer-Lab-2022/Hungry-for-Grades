import { useSeletedFilters } from './useSelectedFilters';

import SearchSection from './searchSection/SearchSection';

import useSearchQuery from './useSearchQuery';

import LoaderCard from '@/components/loader/loaderCard/LoaderCard';

function SearchCourses() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();

  const { data, isLoading, error } = useSearchQuery(selectedFilters);

  return (
    <>
      <SearchSection
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {isLoading && <LoaderCard className={''} />}
      {error && <div>Error: </div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  );
}

export default SearchCourses;
