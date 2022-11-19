/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useQuery } from '@tanstack/react-query';

import  { useState } from 'react'

import CourseCard from './CourseCard';

import styles from './CourseList.module.scss';

import LoaderCards from '@components/loader/loaderCard/LoaderCards';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';

import { UseCountry } from '@/store/countryStore';

import Pagination from '@/components/pagination/Pagination';

async function getCourses(country : string, currentPage : number) {

    const Courses = InstructorRoutes.GET.getCourses;
  
    Courses.params = '635d21f7f1f00520bae45867';
  
    Courses.query = `
    page=${currentPage}
    &limit=${4}
    &country=${country}`;
    return getRequest(Courses);
  }

export default function CourseList() {

    //const instructorId = '635d21f7f1f00520bae45867';

  const [activePage, setActivePage] = useState<number>(1);
  
  const country = UseCountry();

  const { isLoading, data } = useQuery(['getmine', country, activePage], () => getCourses(country, activePage),
  {
    cacheTime: 1000 * 60 * 60 * 24,
    retryDelay: 1000 // 1 second
  }
  );

  //console.log(data?.data?.data[0]?._course.price.currency);


  const list: typeof InstructorRoutes.GET.getCourses.response = data?.data;

  if(isLoading){
    return <LoaderCards numberOfCards = {2} />;
  }

  const toShow = (list?.data).map(
    (course: typeof InstructorRoutes.GET.getCourses.response.data[0]) => {
      console.log(course._course.price.currency);
      return  <CourseCard key={course?._course._id} {...course} />;
    }
  );

  return (
    <div className={styles.course_section}>
        <h2>Instructor Courses</h2>
        <div className={styles.course_wrapper} />
        {toShow}
        {data?.data?.totalPages > 0 && (
                <Pagination
                  activePage={activePage}
                  pages={data?.data?.totalPages as number}
                  setActivePage={setActivePage}
                />
              )}
    </div>
  )
}
