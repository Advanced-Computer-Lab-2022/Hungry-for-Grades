import TopRatedCourses from './TopRatedCoursesSection';

import TopInstructorsSection from './topInstructorsSection/TopInstructorsSection';

import TestmonialSection from './testmonialSection/TestmonialSection';

import FeatureSection from './featureSection/FeatureSection';

import MainPageSection1 from '@components/HomeSection/MainPageSection1';

import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';

function Landing() {
  return (
    <>
      <MainPageSection1 />
      <FeatureSection />
      <InstructorBillboard />
      <section>
        <TopRatedCourses />
      </section>
      <TopInstructorsSection />

      <TestmonialSection />
    </>
  );
}

export default Landing;
