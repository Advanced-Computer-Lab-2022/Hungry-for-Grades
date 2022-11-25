import { CourseCardProps } from '@/pages/guest/landing/types';

function CourseCardOverlay(props: CourseCardProps) {
  const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

  return (
    <div className='text-dark text-start p-2'>
      <h4>{props.title}</h4>
      <img
        alt={props.title}
        className={`card-img-top rounded img-fluid `}
        src={props.image && props.image.length > 0 ? props.image : COMPANY_LOGO}
        onError={e => {
          e.currentTarget.src = COMPANY_LOGO;
        }}
      />
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
