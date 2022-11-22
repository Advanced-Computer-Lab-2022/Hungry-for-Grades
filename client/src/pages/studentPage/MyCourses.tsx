/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { mapCourseToCardProps } from '../landing/types';

//import styles from './MyCourses.module.scss';

import ProgressBar from './progressBar/ProgressBar';

import { StudentRoutes } from '@/services/axios/dataServices/StudentDataService';

import { getRequest } from '@/services/axios/http-verbs';

import { ICourse } from '@/interfaces/course.interface';

import CourseCard from '@components/course/CourseCard';

import Pagination from '@/components/pagination/Pagination';

import LoaderCards from '@components/loader/loaderCard/LoaderCards';


async function getCourses(activePage: number) {
  const Courses = StudentRoutes.GET.getMyCourses;

  Courses.URL = 'trainee/637969352c3f71696ca34759/courses';

  Courses.query = `page=${activePage}
  &limit=${6}`;

  return getRequest(Courses);
}

export default function MyCourses() {
  const [activePage, setActivePage] = useState<number>(1);

  const { isLoading, data } = useQuery(
    ['ASJLHF', activePage],
    () => getCourses(activePage),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  if (isLoading) return <LoaderCards numberOfCards={3}/>;

  console.log(data?.data?.totalPages);

  const incoming: typeof StudentRoutes.GET.getMyCourses.response.data =
    data?.data?.data;

  //console.log(incoming);

  //const course : ICourse = incoming[0]?._course;

  //console.log(course);

  const toShow = incoming.map(course => {
    const tt: ICourse = course._course;
    const courseCardP = mapCourseToCardProps(tt);
    console.log(course);
    return (
      <div key={course._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard key={course._id}  percent = {course?.progress} pprops = {courseCardP}/>
      </div>
    );
  });

  //console.log(courseCardP);

  return (
    <>
      <div className='container row' style={{ marginLeft: '15%' }}>
        {toShow}
      </div>
      {data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages as number}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </>
  );
}
