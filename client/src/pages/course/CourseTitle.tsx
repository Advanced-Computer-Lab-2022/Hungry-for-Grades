import './course-details.scss';
function CourseTitle() {
  return (
    <div className='bg-dark course-title pt-3 pb-4 ml-5 px-5'>
      <h1>Course Title</h1>
      <h3 className='pb-2'>Course Description</h3>
      <p className='rating mb-1'>
        {' '}
        <strong>Rating</strong>
      </p>
      <p className='other mb-1'>
        <small>Created by</small>
      </p>
      <p className='other mb-1'>
        <small>released</small>
      </p>
    </div>
  );
}

export default CourseTitle;
