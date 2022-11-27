import TopRatedCourses from './TopRatedCoursesSection';

import TopInstructorsSection from './topInstructorsSection/TopInstructorsSection';

import TestmonialSection from './testmonialSection/TestmonialSection';

import FeatureSection from './featureSection/FeatureSection';

import MainSection from './mainSection/MainSection';

import Based from './basedOnYourChoices/Based';

import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';

function Landing() {
  return (
    <>
      <MainSection />
      <FeatureSection />
      <InstructorBillboard />
      <TopRatedCourses />

      <Based />
      <TopInstructorsSection />

      <TestmonialSection />
    </>
  );
}

export default Landing;
