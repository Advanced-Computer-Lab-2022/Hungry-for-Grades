import InstructorCourseCard from './InstructorCourseCard';

import useSearchQuery from './useSearchQuery';

import InstructorCoursesAnalytics from './InstructorCoursesAnalytics';

import './nav-button.scss';
import SearchSection from '@pages/guest/searchCourses/searchSection/SearchSection';

import NoResults from '@pages/guest/searchCourses/coursesSection/NoResults';

import useSeletedFilters from '@/hooks/useSelectedFilters';

import Pagination from '@/components/pagination/Pagination';
import { SelectFiltersType } from '@pages/guest/searchCourses/types';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import useMultistepForm from '@/hooks/useMultistepForm';
function InstructorCoursesSection() {
  const { currentStepIndex, goTo } = useMultistepForm(
    [<></>, <></>],
    ['InstructorCoursesAnalytics'],
    ['']
  );
  const [selectedFilters, setSelectedFilters] = useSeletedFilters() as [
    SelectFiltersType,
    React.Dispatch<React.SetStateAction<SelectFiltersType>>
  ];

  const { isLoading, isError, data, error, activePage, setActivePage } =
    useSearchQuery(selectedFilters);
  const verifiedData = data?.data;
  console.log(verifiedData);
  if (isError) return <ErrorMessage errorMessage={error?.message} />;
  console.log(verifiedData);
  return (
    <>
      <SearchSection
        heading=''
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        subHeading=''
      />
      {!isLoading && !isError && data && verifiedData?.data?.length > 0 && (
        <div className='container'>
          <div className='d-flex flex-row justify-content-evenly align-items-center mb-5'>
            <button
              className={`navButton ${
                currentStepIndex === 0 ? 'activeNavButton' : ''
              }`}
              type='button'
              onClick={function go() {
                goTo(0);
              }}
            >
              Course Details
            </button>
            <button
              className={`navButton ${
                currentStepIndex === 1 ? 'activeNavButton' : ''
              }`}
              type='button'
              onClick={function go() {
                goTo(1);
              }}
            >
              Courses Analytics
            </button>
          </div>
          {currentStepIndex === 1 && (
            <InstructorCoursesAnalytics
              data={verifiedData?.data.map(course => ({
                Earnings: course.earning,
                title: course._course.title,
                Trainees: course._course.numberOfEnrolledTrainees
              }))}
            />
          )}
          {currentStepIndex === 0 &&
            verifiedData?.data.map(course => (
              <InstructorCourseCard key={course._course.id} {...course} />
            ))}
          <Pagination
            activePage={activePage}
            pages={verifiedData?.totalPages}
            setActivePage={setActivePage}
          />
        </div>
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