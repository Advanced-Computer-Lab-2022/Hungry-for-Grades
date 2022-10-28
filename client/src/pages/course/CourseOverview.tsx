import { Course } from '@/services/axios/dataServices/CoursesDataService';

function CourseOverview(props: Course) {
  if (!props.outline) {
    return <></>;
  }
  return (
    <div className={`p-5 text-dark bg-light border rounded-3 m-3`}>
      <h3 className='mb-2'>Course overview</h3>
      <ul>
        {props.outline.map(o => (
          <li key={o.type}>{o.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseOverview;
