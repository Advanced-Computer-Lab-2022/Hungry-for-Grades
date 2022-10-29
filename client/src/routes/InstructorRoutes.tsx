
import { Outlet } from 'react-router-dom'

import InstructorDash from '@components/Instructor/InstructorMainSection';

export default function InstructorRoutes() {
  return (
    <>
       <InstructorDash />
       <Outlet />
    </>
  )
}
