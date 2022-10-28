import TopRatedCourses from './TopRatedCourses';

import MainPageSection1 from '@components/HomeSection/MainPageSection1';

import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';

import InstructorMainSection from '@/components/Instructor/InstructorMainSection';

function Landing() {
  return (
    <>
      <InstructorMainSection />
      <MainPageSection1 />
      <InstructorBillboard />
      <section>
        <TopRatedCourses />
      </section>
    </>
  );
}

export default Landing;
