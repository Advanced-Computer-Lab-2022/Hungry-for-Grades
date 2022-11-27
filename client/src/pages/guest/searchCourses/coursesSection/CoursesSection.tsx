import CourseCard from '@/components/courseCard/CourseCard';
import { mapCourseToCardProps } from '@/pages/guest/landing/types';
import { ICourse } from '@interfaces/course.interface';

function CoursesSection(props: { data: ICourse[] }) {
  return (
    <div className='row container'>
      {props?.data?.length === 0 ? (
        <div className='text-start'>
          <h3>Sorry, we couldnt find any results for</h3>
          <h4>Try adjusting your search. Here are some ideas:</h4>
          <ul>
            <li className='list-group-item '>
              &#x2713; &nbsp; Make sure all words are spelled correctly
            </li>
            <li className='list-group-item'>
              &#x2713; &nbsp; Try more general search terms
            </li>
            <li className='list-group-item'>
              &#x2713; &nbsp;Try different search terms
            </li>
          </ul>
        </div>
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
