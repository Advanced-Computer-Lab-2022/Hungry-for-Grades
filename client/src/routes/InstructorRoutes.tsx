import { Outlet } from 'react-router-dom';

import InstructorDash from '@components/Instructor/InstructorMainSection';

import InstrctorPage from '@pages/InstructorProfile/InstructorPage';

export default function InstructorRoutes() {
  return (
    <>
      <InstrctorPage />
      <InstructorDash />
      <Outlet />
    </>
  );
}
