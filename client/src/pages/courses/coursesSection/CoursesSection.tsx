import { ICourse } from '@interfaces/course.interface';

function CoursesSection(props: ICourse) {
  // const { title, description, price, image, category, author } = props;
  return <div>{props._id}</div>;
}

export default CoursesSection;
