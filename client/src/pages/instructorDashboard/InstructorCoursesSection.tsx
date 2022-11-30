import InstructorCourseCard from './InstructorCourseCard';

import useSearchQuery from './useSearchQuery';

import SearchSection from '@pages/guest/searchCourses/searchSection/SearchSection';

import NoResults from '@pages/guest/searchCourses/coursesSection/NoResults';

import useSeletedFilters from '@/hooks/useSelectedFilters';

import Pagination from '@/components/pagination/Pagination';
import { SelectFiltersType } from '@pages/guest/searchCourses/types';
import ErrorMessage from '@/components/error/message/ErrorMessage';

function InstructorCoursesSection() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters() as [
    SelectFiltersType,
    React.Dispatch<React.SetStateAction<SelectFiltersType>>
  ];
  const { isLoading, isError, data, error, activePage, setActivePage } =
    useSearchQuery(selectedFilters);
  const verifiedData = data?.data;
  console.log(verifiedData);
  if (isError) return <ErrorMessage errorMessage={error?.message} />;
  return (
    <>
      <SearchSection
        heading=''
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        subHeading=''
      />
      {!isLoading && !isError && data && verifiedData?.data?.length > 0 && (
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

      {!isLoading && !isError && data && verifiedData?.data?.length === 0 && (
        <div className='container'>
          <NoResults />
        </div>
      )}
    </>
  );
}

export default InstructorCoursesSection;
