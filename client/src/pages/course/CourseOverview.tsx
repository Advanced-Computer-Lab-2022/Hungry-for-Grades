import './course-details.scss';

function CourseOverview() {
  return (
    <div className='mt-3 pt-3 ml-5 px-5'>
      <h2 className='text-dark'>Course overview</h2>
      <ul className='text-dark m-2'>
        <li className='m-1 text-dark'>point1</li>
        <li className='m-1 text-dark'>point2</li>
        <li className='m-1 text-dark'>point3</li>
        <li className='m-1 text-dark'>point4</li>
      </ul>
      <button
        className='udlite-btn udlite-heading-sm bg-dark m-3 mb-5'
        type='button'
      >
        {' '}
        Show full overview
      </button>
    </div>
  );
}

export default CourseOverview;
