/* eslint-disable @typescript-eslint/no-unsafe-call */
import InstructorCoursesSection from './InstructorCoursesSection';
import useSearchQuery from './useSearchQuery';
import { useSeletedFilters } from './useSelectedFilters';
import SearchSection from './searchSection/SearchSection';
function InstructorDashboard() {
  const [selectedFilters, setSelectedFilters] = useSeletedFilters();
  const { isLoading, isError, data, error } = useSearchQuery(selectedFilters);
  if (isError) return <div>{error?.message}</div>;
  return (
    <>
      <SearchSection
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      {!isLoading && <InstructorCoursesSection {...data?.data} />}
    </>
  );
}

export default InstructorDashboard;
