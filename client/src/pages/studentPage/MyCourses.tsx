
import { useQuery } from '@tanstack/react-query';

import { StudentRoutes } from '@/services/axios/dataServices/StudentDataService';

import { getRequest } from '@/services/axios/http-verbs';
import { ICourse } from '@/interfaces/course.interface';
import { mapCourseToCardProps } from '../landing/types';

import CourseCard from '@components/course/CourseCard';

import styles from './MyCourses.module.scss';
import { UseCountry } from '@/store/countryStore';


async function getCourses(country : string) {
  
  const Courses = StudentRoutes.GET.getMyCourses;

  Courses.URL = 'trainee/637969352c3f71696ca34759/courses';

  Courses.query = `
  country=${country}`;



  return getRequest(Courses);
}

export default function MyCourses() {


  const country = UseCountry();

  const { isLoading, data } = useQuery(
    ['ASJLHF', country],
    () => getCourses(country),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  if(isLoading) return <div>Loading</div>;

  const incoming : typeof  StudentRoutes.GET.getMyCourses.response.data = data?.data?.data;

  //const course : ICourse = incoming[0]?._course;
  
  //console.log(course);

  const toShow = incoming.map((course) => {
    const tt : ICourse = course._course;
    const courseCardP = mapCourseToCardProps(tt);
    return <div key = {course._id} className ={'col-12 col-md-6 col-lg-4'} style = {{marginRight:'4rem'}}><CourseCard key = {course._id} {...courseCardP} /></div>

  })

  //console.log(courseCardP);

  return (
    <div className = {styles.list}>
      {toShow}
    </div>
  )
}
