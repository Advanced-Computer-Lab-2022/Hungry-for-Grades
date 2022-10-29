import TopRatedCourses from './TopRatedCourses';

import MainPageSection1 from '@components/HomeSection/MainPageSection1';

import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';

import InstructorMainSection from '@/components/Instructor/InstructorMainSection';

import AdminDash from '@/components/Admin/AdminDash';

function Landing() {
  return (
    <>
      <MainPageSection1 />
      <InstructorBillboard />
      <section>
        <TopRatedCourses />
      </section>
    </>
  );
}

export default Landing;
