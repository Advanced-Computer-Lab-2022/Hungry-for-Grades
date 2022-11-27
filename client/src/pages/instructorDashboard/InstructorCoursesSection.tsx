import InstructorCourseCard from './InstructorCourseCard';

import useSearchQuery from './useSearchQuery';

import { useSeletedFilters } from './useSelectedFilters';

import Pagination from '@/components/pagination/Pagination';
import SearchSection from './searchSection/SearchSection';

function InstructorCoursesSection() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();
  const { isLoading, isError, data, error, activePage, setActivePage } =
    useSearchQuery(selectedFilters);
  const verifiedData = data?.data;
  console.log(verifiedData);
  if (isError) return <div>{error?.message}</div>;
  return (
    <>
      <SearchSection
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {!isLoading && (
        <>
          {verifiedData?.data.map(course => (
            <InstructorCourseCard key={course._course.id} {...course} />
          ))}
          <Pagination
            activePage={activePage}
            pages={verifiedData?.totalPages}
            setActivePage={setActivePage}
          />
        </>
      )}
    </>
  );
}

export default InstructorCoursesSection;
