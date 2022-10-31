import { CourseCardProps } from '@/pages/landing/types';

function CourseCardOverlay(props: CourseCardProps) {
  return (
    <div className='text-dark text-start p-2'>
      <h4>{props.title}</h4>
      <hr />
      <p>{props.description}</p>
      {props.outline?.length ? (
        <ul className='list-group bg-secondary'>
          {props.outline.slice(0, 3).map(o => (
            <li key={o} className='list-group-item bg-secondary border-0'>
              {' '}
              &#x2713; &nbsp; {o}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CourseCardOverlay;
