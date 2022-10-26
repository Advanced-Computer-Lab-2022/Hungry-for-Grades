import { useQuery } from '@tanstack/react-query';

import { useSeletedFilters, type SelectFiltersType } from './useFilters';

import SearchSection from './searchSection/SearchSection';

import LoaderCard from '@/components/loader/loaderCard/LoaderCard';

// eslint-disable-next-line @typescript-eslint/require-await
async function getCourses(selectedFilters: SelectFiltersType) {
  //getRequest()
	alert(selectedFilters);
}

function SearchCourses() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();

  const { data, isLoading, error } = useQuery(
    ['courses', selectedFilters],
    async () => {
      await getCourses(selectedFilters);
    }
  );

  return (
    <>
      <SearchSection
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {isLoading && <LoaderCard className={''} img={''} />}
      {error && <div>Error: </div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  );
}

export default SearchCourses;
