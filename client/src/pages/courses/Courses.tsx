/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styles from './courses.module.scss';

import { useSeletedFilters } from './useSelectedFilters';

import SearchSection from './searchSection/SearchSection';

import useSearchQuery from './useSearchQuery';

import CoursesSection from './coursesSection/CoursesSection';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import Pagination from '@/components/pagination/Pagination';

function SearchCourses() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();

  const { data, isLoading, error, activePage, setActivePage } =
    useSearchQuery(selectedFilters);
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
          {data && (
            <>
              <CoursesSection {...data.data} />
              {data?.data?.length > 11 && (
                <Pagination
                  activePage={activePage}
                  pages={data?.data?.totalPages as number}
                  setActivePage={setActivePage}
                />
              )}
            </>
          )}
          {error && <div>Error: </div>}
        </div>
      </section>
    </section>
  );
}

export default SearchCourses;
