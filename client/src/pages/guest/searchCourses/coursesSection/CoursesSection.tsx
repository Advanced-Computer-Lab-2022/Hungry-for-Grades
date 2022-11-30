import NoResults from './NoResults';

import CourseCard from '@/components/courseCard/CourseCard';
import { mapCourseToCardProps } from '@/pages/guest/landing/types';
import { ICourse } from '@interfaces/course.interface';

function CoursesSection(props: { data: ICourse[] }) {
  return (
    <div className='row container'>
      {props?.data?.length === 0 ? (
       <NoResults/>
      ) : (
        props?.data?.map((course: ICourse) => {
          const mapCourseToCard = mapCourseToCardProps(course);
          console.log(mapCourseToCard.id + ' Hussein');
          return (
            <div key={course._id} className='col-12 col-md-6 col-lg-4'>
              <CourseCard percent={-1} pprops={mapCourseToCard} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default CoursesSection;
