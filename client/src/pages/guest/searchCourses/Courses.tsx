import styles from './courses.module.scss';

import SearchSection from './searchSection/SearchSection';

import CoursesSection from './coursesSection/CoursesSection';

import { SelectFiltersType } from './types';

import useSearchQuery from '@/pages/guest/searchCourses/useSearchQuery';
import useSeletedFilters from '@/hooks/useSelectedFilters';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import Pagination from '@/components/pagination/Pagination';
import ErrorMessage from '@/components/error/message/ErrorMessage';

function SearchCourses() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters() as [
    SelectFiltersType,
    React.Dispatch<React.SetStateAction<SelectFiltersType>>
  ];
  const { data, isLoading, error, activePage, setActivePage, isError } =
    useSearchQuery(selectedFilters);
  if (isError && error) {
    return <ErrorMessage />;
  }
  if (data?.success === false) {
    return <ErrorMessage errorMessage={data?.message} />;
  }

  return (
    <section className={styles.courses__page}>
      <SearchSection
        heading='Search For Courses'
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        subHeading='Find the best courses for you'
      />
      <section className={styles.courses__section}>
        <div className='container'>
          {isLoading && <LoaderCards numberOfCards={12} />}
          {error && <div>error</div>}
          {data && (
            <>
              <CoursesSection {...data} />
              {data?.totalResults > 0 && (
                <Pagination
                  activePage={activePage}
                  pages={data?.totalPages}
                  setActivePage={setActivePage}
                />
              )}
            </>
          )}
          {error && <ErrorMessage errorMessage={error?.message} />}
        </div>
      </section>
    </section>
  );
}

export default SearchCourses;
