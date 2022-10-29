import styles from './courses.module.scss';

import { useSeletedFilters } from './useSelectedFilters';

import SearchSection from './searchSection/SearchSection';

import useSearchQuery from './useSearchQuery';

import CoursesSection from './coursesSection/CoursesSection';

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
      <section className={styles.courses__section}>
        <div className='container'>
          {isLoading && <LoaderCards numberOfCards={12} />}
          {error && <div>error</div>}
          {data && <CoursesSection {...data.data} />}
          {error && <div>Error: </div>}
        </div>
      </section>
    </section>
  );
}

export default SearchCourses;
