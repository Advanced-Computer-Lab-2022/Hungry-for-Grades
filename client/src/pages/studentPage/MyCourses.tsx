
import { ICourse } from '@/interfaces/course.interface';
import { StudentRoutes } from '@/services/axios/dataServices/StudentDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { UseCountry } from '@/store/countryStore';
import { useQuery } from '@tanstack/react-query';


async function getCourses() {
  
  const Courses = StudentRoutes.GET.getMyCourses;

  Courses.params = '637969352c3f71696ca34759';

  Courses.query = ``;

  return getRequest(Courses);

}

export default function MyCourses() {

  const country = UseCountry();

  const { isLoading, data } = useQuery(
    ['getmycoursesStd'],
    () => getCourses(),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  const incoming : ICourse = data?.data;

  console.log(incoming);

  return (
    <div>MyCourses</div>
  )
}
