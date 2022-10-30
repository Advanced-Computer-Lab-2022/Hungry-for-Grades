import CourseCard from '@/components/course/CourseCard';
import { mapCourseToCardProps } from '@/pages/landing/types';
import { ICourse } from '@interfaces/course.interface';

function CoursesSection(props: { data: ICourse[] }) {
  // const { title, description, price, image, category, author } = props;
  return (
    <div className='row'>
      {props?.data?.map((course: ICourse) => {
        const mapCourseToCard = mapCourseToCardProps(course);
        return (
          <div key={course._id} className='col-12 col-md-6 col-lg-4'>
            <CourseCard {...mapCourseToCard} />
          </div>
        );
      })}
    </div>
  );
}

export default CoursesSection;
