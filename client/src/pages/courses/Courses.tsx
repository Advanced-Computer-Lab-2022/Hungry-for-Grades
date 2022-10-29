import styles from './courses.module.scss';

import { useSeletedFilters } from './useSelectedFilters';

import SearchSection from './searchSection/SearchSection';

import useSearchQuery from './useSearchQuery';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';

function SearchCourses() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();

  const { data, isLoading, error } = useSearchQuery(selectedFilters);

  return (
    <section className={styles.courses__page}>
      <SearchSection
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <section>
        <div className='container'>
          {isLoading && <LoaderCards numberOfCards={12} />}
          {error && <div>error</div>}
          {/* 			{data?.data.map(course => (
								<div key={course._id}>{course.title}</div>
							))} */}
        </div>
      </section>
      {error && <div>Error: </div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </section>
  );
}

export default SearchCourses;
