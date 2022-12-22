import { ICourse } from '@/interfaces/course.interface';

function Overview(props: ICourse) {
  return (
    <>
      {props.outline && (
        <div className='container m-3 border rounded-3'>
          <ul className='list-group bg-light'>
            {props.outline.map(o => (
              <li key={o} className='list-group-item bg-light border-0'>
                {' '}
                &#x2713; &nbsp;{o}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Overview;
