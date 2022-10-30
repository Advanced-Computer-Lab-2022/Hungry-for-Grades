import TopRatedCourses from './TopRatedCourses';

import TopInstructorsSection from './topInstructorsSection/TopInstructorsSection';

import MainPageSection1 from '@components/HomeSection/MainPageSection1';

import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';
function Landing() {
  return (
    <>
      <MainPageSection1 />
      <InstructorBillboard />
      <section>
        <TopRatedCourses />
      </section>
      <TopInstructorsSection />
    </>
  );
}

export default Landing;
